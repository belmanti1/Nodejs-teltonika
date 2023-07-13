var Device= require('../models/deviceModel.js');
const User = require('../models/User.js')

// create and save new Device 
exports.create=(req,res)=>{
  
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
}

// Get the current user ID from the request or session (depending on your setup)
const currentUserId = req.user.id; // Assuming the user ID is available in req.user.id

// Find the user by ID and retrieve their name
User.findById(currentUserId)
    .then(user => {
        if (!user) {
            res.status(404).send({ message: "User not found" });
            return;
        }

        // Create a new device object with the user's name
        const newDevice = new Device({
            ident_personne: currentUserId,
            nom: user.name, // Assuming the user's name is stored in the 'name' property
            imei: req.body.imei,
            device_nom: req.body.device_nom,
            status: req.body.status
        });

        // Save the device in the database
        newDevice.save()
            .then(data => {
                res.redirect('/device/add-device');
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Some error occurred while creating a create operation" });
            });
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Some error occurred while retrieving the user" });
    });
        
}


// retrieve and return all devices/retrieve and return a single device
exports.find=(req,res)=>{
     if(req.query.id){
          const id=req.query.id;
          Device.findById(id)
             .populate('ident_personne','name')
             .then(data=>{
                 if(!data){
                  res.status(404).send({message:"Not found device with id" +id})
                 }else{
                   res.send(data)
                 }
             })
             .catch(err=>{
                 res.send(500).send({message:"Error retriving device with id"+id})
             })
             
             
     }else{
       
       Device.find()
        .populate('ident_personne','name')
        .then(user=>{
          res.send(user)
        })
        .catch(err=>{
          res.status(500).send({ message:err.message || "Error Occured while retriving device information"})
        })

     }
     
}

//update a new identified device by device id 
exports.update=async (req,res)=>{
      if(!req.body){
        return res
           .status(400)
           .send({ message :"Data to update can note be empty"})
      }
      const id=req.params.id;
      
      Device.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
         .then(data=>{
            if(!data){
              res.status(404).send({message:`Cannot Update device with${id}.Maybe device not found!`})
            }
            else{
              res.send(data)
            }
         })
         .catch(err =>{
          res.status(500).send({message:"Error Update device information"})
         })
}
// Delete a Device with specified device id  in the request
exports.delete=(req,res)=>{
     const id = req.params.id;

     Device.findByIdAndDelete(id)
       .then(data=>{
           if(!data){
            res.status(404).send({message:`Cannot Delete with id ${id}.Maybe id is wrong`})
           }else{
              res.send({
                message:"Device was delete successfully!"
              })
           }
       })
       .catch(err => {
        res.status(500).send({
          message:"Could not delete Device with id="+id
        })
       });
}

