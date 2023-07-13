var Canal= require('../models/canalModel.js');
const User = require('../models/User.js');
const net = require('net');
const Device = require('../models/deviceModel.js')
//const net =require('net')

// exports.connect=(req,res)=>{
//   const server = net.createServer((socket) => {
//     let isFirstMessage = true;
//     const imeiList = [];
  
//     // Method for performing handshake
//     function perform_handshake(imei) {
//       // Determine if server accepts data from this module
//       const acceptData = true; /* Your logic to determine if data should be accepted for this IMEI */;
      
//       // Respond to module with binary packet indicating if data was accepted
//       const response = acceptData ? Buffer.from([0x01]) : Buffer.from([0x00]);
//       socket.write(response);
      
//       if (acceptData) {
//         console.log('Handshake successful');
//       } else {
//         console.log('Handshake failed');
//       }
//     }
  
//     // Method for establishing a connection
//     function establish_connection() {
//       // Send a connection message to the module
//       const message = Buffer.from('Connection message');
//       socket.write(message);
  
//       console.log('Connection successful');
//     }
  
//     // Method for closing a connection
//     function close_connection() {
//       socket.end();
  
//       console.log('Connection ended');
//     }
  
//     socket.on('data', (data) => {
//       if (isFirstMessage) {
//         const imeiLength = data.readUInt16BE(0);
//         const imei = data.slice(2, 2 + imeiLength).toString('hex');
//         console.log(`IMEI: ${imei}`);
//         imeiList.push(imei);
  
//         perform_handshake(imei);
//         establish_connection();
  
//         isFirstMessage = false;
//       } else {
//         const dataStr = data.toString('hex');
//         console.log(`Received data: ${dataStr}`);
  
//         // Parse the received data and determine the sent data number
//         const sentDataNumber = /* Your logic to determine the sent data number */;
        
//         // Generate a response indicating the received data number
//         const response = Buffer.alloc(4);
//         response.writeUInt32BE(sentDataNumber, 0);
  
//         // Send the response to the module
//         socket.write(response);
//       }
//     });
  
//     socket.on('end', () => {
//       close_connection();
//     });
  
//     socket.on('error', (err) => {
//       console.error('Socket error:', err);
//     });
//   });
  
//   const port = 9000;
//   server.listen(port);
// }
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
       canal_ip : req.body.canal_ip,
       canal_port :req.body.canal_port,
      
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

