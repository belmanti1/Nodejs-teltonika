var Canal= require('../models/canalModel.js');
const User = require('../models/User.js');
const tcpServer=require('../models/TcpServer.js');
const net = require('net');
const Device = require('../models/deviceModel.js');
const Parser=require('../node_modules/teltonika-parser-fix')
const Codec8e=require('../node_modules/teltonika-parser-fix/codecs/codec8e.js')

// create and save new Canal 
exports.create=(req,res)=>{
   // validate request
   if(!req.body){
      res.status(400).send({message:"Content can not be empty!"});
      return;
   }
   // Get the current user ID from the request or session (depending on your setup)
   const currentUserId =req.user.id; // Assuming the user ID is available in req.user.id
   //Find the user by ID and retrieve their name 
   User.findById(currentUserId)
       .then(user =>{
            if(!user){
              res.status(404).send({message :"User not found"});
              return ; 
            }
       })
   // new canal 
   const canal =new Canal({
       iden_pers:currentUserId,
       canal_nom : req.body.canal_nom,
       canal_port :req.body.canal_port,
       tcpServerRunning:false
      })
   canal
        .save(canal)
        .then(data=>{
          res.redirect('/canal/add_canal')
        })
        .catch(err=>{
          res.status(500).send({
            message:err.message || "Some error occured while creating a create operation"
          });
    });
}
// retrieve and return all canaux/retrieve and return a single canal
exports.find=(req,res)=>{
     if(req.query.id){
          const id=req.query.id;
          Canal.findById(id)
             .populate('iden_pers','name')
             .then(data=>{
                 if(!data){
                  res.status(404).send({message:"Not found canal with id" +id})
                 }else{
                   res.send(data)
                 }
             })
             .catch(err=>{
                 res.send(500).send({message:"Error retriving canal with id"+id})
             })
     }else{
       Canal.find()
        .populate('iden_pers','name')
        .then(user=>{
          res.send(user)
        })
        .catch(err=>{
          res.status(500).send({ message:err.message || "Error Occured while retriving canal information"})
        })

     }
     
}
//update a new identified canal by canal id 
exports.update=(req,res)=>{
      if(!req.body){
        return res
           .status(400)
           .send({ message :"Data to update can note be empty"})
      }
      const id=req.params.id;
      Canal.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
         .then(data=>{
            if(!data){
              res.status(404).send({message:`Cannot Update canal with${id}.Maybe canal not found!`})
            }
            else{
              res.send(data)
            }
         })
         .catch(err =>{
          res.status(500).send({message:"Error Update canal information"})
         })
}
// Delete a Canal with specified canal id  in the request
exports.delete=(req,res)=>{
     const id =req.params.id;

     Canal.findByIdAndDelete(id)
       .then(data=>{
           if(!data){
            res.status(404).send({message:`Cannot Delete with id ${id}.Maybe id is wrong`})
           }else{
              res.send({
                message:"Canal was delete successfully!"
              })
           }
       })
       .catch(err => {
        res.status(500).send({
          message:"Could not delete Canal with id="+id
        })
    });
}
///------ on-server ----------//
// Start TCP server
exports.startTCPServer = async (req, res) => {
  try {
    const channelId = req.query.id;
    const channel = await Canal.findById(channelId);

    if (!channel) {
      return res.status(404).send('Channel not found');
    }

    if (channel.tcpServerRunning) {
      return res.send('TCP server is already running');
    }

    // Create TCP server
    const tcpServer = net.createServer(c => {
      console.log('Client connected');
      c.on('end', () => {
        console.log('Client disconnected');
      });

      c.on('data', data => {
        let buffer = data;
        let parser = new Parser(buffer);

        if (parser.isImei) {
          c.write(Buffer.alloc(1, 1));
        } else {
          let avl = parser.getAvl();

          let writer = new binutils.BinaryWriter();
          writer.WriteInt32(avl.number_of_data);

          let response = writer.ByteBuffer;
          c.write(response);
        }
      });
    });

    // Start the TCP server
    tcpServer.listen(Canal.canal_port, async () => {
      // Create a TCPServer instance to store relevant server information
      const records = Parser._codec.avlObj.records;
      console.log("records saved:", records);
      for (const record of records) {
        const serverInstance = new tcpServer({
          channel: channel._id,
          serverInstance: tcpServer,
          identifiant_personne:currentUserId,
          imei_device:req.body.imei,
          port:canal_port,
          nom_group:group_nom,
          stream_nom:req.body.stream_nom,
          timestamp: record.timestamp,
          priority: record.priority,
          gps: {
            longitude: record.gps.longitude,
            latitude: record.gps.latitude,
            altitude: record.gps.altitude,
            angle: record.gps.angle,
            speed: record.gps.speed,
          },
          event_id: record.event_id,
          properties_count: record.properties_count,
          ioElement: record.ioElement,
        });
     
        try {
          const savedInstance = await serverInstance.save();
          console.log("Stream saved:", savedInstance);
          Canal.tcpServer = serverInstance._id; // Store TCPServer's ObjectId
          Canal.tcpServerRunning = true;
          Canal.save(); 
          res.send('TCP server started successfully');
        } catch (err) {
          console.error("Error while saving stream:", err);
        }
      }
      

    });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
};

// Stop TCP server
exports.stopTCPServer = async (req, res) => {
  try {
    const channelId = req.query.id;
    const channel = await Canal.findById(channelId);

    if (!channel) {
      return res.status(404).send('Channel not found');
    }

    if (!channel.tcpServerRunning) {
      return res.send('TCP server is not running');
    }

    // Find the TCPServer instance associated with the channel
    const serverInstance = await tcpServer.findOne({ channel: channel._id });

    if (!serverInstance) {
      return res.status(500).send('TCPServer instance not found');
    }

    // Close the TCP server
    serverInstance.serverInstance.close(() => {
      serverInstance.remove(); // Remove the TCPServer instance
      channel.tcpServer = null;
      channel.tcpServerRunning = false;
      channel.save(); // Save changes to the database
      res.send('TCP server stopped successfully');
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
};