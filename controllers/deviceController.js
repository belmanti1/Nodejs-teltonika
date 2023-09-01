const Device= require('../models/deviceModel.js');
const User = require('../models/User.js');
const Group = require('../models/groupModel.js');
const Canal= require('../models/canalModel.js');

// create new device 
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Get the current user ID from the request or session (depending on your setup)
  const currentUserId = req.user.id; // Assuming the user ID is available in req.user.id

  try {
    // Find the user by ID and retrieve their name
    const user = await User.findById(currentUserId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const { imei, device_nom, group_nom,canal_port } = req.body;
    // Find the group with the selected name
    const group = await Group.findById(group_nom)
    if (!group) {
      return res.status(400).json({ error: "Invalid group name selected" });
    }
    const canal = await Canal.findById(canal_port)
    if(!canal){
      return res.status(400).json({error : "Invalid canal name selected "});
    }
    const existingDevice = await Device.findOne({ imei });
    if (existingDevice) {
      // If the device with the same IMEI already exists, redirect to /device/add-device
      return res.redirect('/device/add-device');
    } 
    function insertDevice(){
            // Create a new device object with the user's name and associated group ID
            const newDevice = new Device({
              ident_personne: currentUserId,
              name: user.name,
              imei: imei,
              device_nom: device_nom,
              ident_group: group_nom, 
              ident_canal: canal_port// Store the group ID in the ident_group field
            });
            newDevice
              .save(newDevice)
              .then(data => {
                res.redirect('/device/add-device')
              })
              .catch(err => {
                res.status(500).send({
                  message: err.message || "Some error occurred while creating a create operation"
                });
              });
    }
    //GW14 //test1
    Device.findOne({ident_group : group_nom},(err,doc)=>{
         if(err){
              res.redirect('/device/add-device');
         }else{
              if(doc){
                 if(doc.ident_group && doc.ident_canal){
                      res.redirect("/device/add-device");
                 }
                 else if(doc.ident_group && !doc.ident_canal){
                      res.redirect("/device/add-device");
                 }
                 else {
                      insertDevice();
                 }
              }
              else {
                     insertDevice();
              }
         }
    });

          }
   catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while processing the request"
    });
  }
}

// retrieve and return all devices/retrieve and return a single device
exports.find=async (req,res)=>{
  if(req.query.id){
       const id=req.query.id;
       Device.findById(id)
          .populate('ident_personne','name')
          .populate('ident_group','group_nom')
          .populate('ident_canal','canal_port')
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
           .populate('ident_group','group_nom')
           .populate('ident_canal','canal_port')
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
      const { imei, device_nom, group_nom,canal_nom } = req.body;
      if(!req.body){
        return res
           .status(400)
           .send({ message :"Data to update can note be empty"})
      }
      const id=req.params.id;
      console.log(id);
      Device.findByIdAndUpdate(id,{imei:imei,device_nom:device_nom,ident_group: group_nom, 
        ident_canal: canal_nom},{useFindAndModify:false})
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

  

