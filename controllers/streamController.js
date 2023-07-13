var Stream= require('../models/streamModel.js');
const User = require('../models/User.js');
const Canal = require('../models/canalModel.js');
const Device = require('../models/deviceModel.js');

// create and save new Stream
exports.create=(req,res)=>{
   // validate request
   if(!req.body){
      res.status(400).send({message:"Content can not be empty!"});
      return;
   }
   // Get the current user ID from the request or session (depending on your setup)
   const currentUserId= req.body.id; 
   User.findById(currentUserId)
   .then(user =>{
        if(!user){
          res.status(404).send({message :"User not found"});
          return ; 
        }
   });
   const currentDeviceId =req.body.id;
   Device.findById(currentDeviceId)
      .then(device=>{
           if(!device){
            res.status(404).send({message:"Device not found"})
           }
      })
   const currentChannelId = req.body.id;
   Canal.findById(currentChannelId)
   .then(canal=>{
        if(!canal){
          res.status(404).send({message :"Canal not found"})
        }
   })

   // new group 
   const stream=new Stream({
    ident_perso:currentUserId,
    id_appareil:currentDeviceId,
    ident_channel:currentChannelId,
    flux_nom: req.body.flux_nom,
    battery_current:req.body.battery_current,
    engine_ignition_status:req.body.engine_ignition_status,
    event_priority_enum: req.body.event_priority_enum,
    external_powersource_voltage:req.body.external_powersource_voltage,
    movement_status:req.body.movement_status,
    ip_port:req.body.ip_port,
    position_altitude:req.body.position_altitude,
    position_direction:req.body.position_altitude,
    position_hdop:req.body.position_hdop,
    position_pdop:req.body.position_pdop,
    position_satelites:req.body.position_satelites,
    position_speed:req.body.position_satelites,
    position_valid:req.body.position_valid
      })
   stream
        .save(stream)
        .then(data=>{
          res.send(data)
        })
        .catch(err=>{
          res.status(500).send({
            message:err.message || "Some error occured while creating a create operation"
          });
        });
}


// retrieve and return all streams/retrieve and return a single stream
exports.find=(req,res)=>{
     if(req.query.id){
          const id=req.query.id;
          Stream.findById(id)
             .then(data=>{
                 if(!data){
                  res.status(404).send({message:"Not found group with id" +id})
                 }else{
                   res.send(data)
                 }
             })
             .catch(err=>{
                 res.send(500).send({message:"Error retriving group with id"+id})
             })
     }else{
       Stream.find()
        .then(user=>{
          res.send(user)
        })
        .catch(err=>{
          res.status(500).send({ message:err.message || "Error Occured while retriving group information"})
        })

     }
     
}

//update a new identified Stream by Stream id 
exports.update=(req,res)=>{
      if(!req.body){
        return res
           .status(400)
           .send({ message :"Data to update can note be empty"})
      }
      const id=req.params.id;
      Stream.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
         .then(data=>{
            if(!data){
              res.status(404).send({message:`Cannot Update Stream with${id}.Maybe Stream not found!`})
            }
            else{
              res.send(data)
            }
         })
         .catch(err =>{
          res.status(500).send({message:"Error Update Stream information"})
         })
}
// Delete a Stream with specified stream id  in the request
exports.delete=(req,res)=>{
     const id =req.params.id;

     Stream.findByIdAndDelete(id)
       .then(data=>{
           if(!data){
            res.status(404).send({message:`Cannot Delete with id ${id}.Maybe id is wrong`})
           }else{
              res.send({
                message:"Stream was delete successfully!"
              })
           }
       })
       .catch(err => {
        res.status(500).send({
          message:"Could not delete Stream with id="+id
        })
       });
}