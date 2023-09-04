const axios =require('axios');
const Group= require('../models/groupModel');
const Canal = require('../models/canalModel');
const Device=require('../models/deviceModel');
exports.home=async (req,res)=>{
    try {
        const groups = await Group.find().exec();
        const canals =await Canal.find().exec();

        res.render('add_device', { devices:"new Data",groups,canals ,name: req.user.name});
      } catch (err) {
        console.error('Error fetching device groups:', err);
        res.status(500).send('Error fetching device groups or device canals.');
      }
}
// exports.lister_device = async (req, res) => {
//     try {
//         const userId = req.user.id; // Access the user's ID from req.user

//         // Find the user's devices using the user ID
//         const userDevices = await Device.find({ ident_personne: userId })
//         const userGroup = await Group.find({iden_pers:userId})
//         const userCanal=await Canal.find({id_person:userId})

//         res.render('lister_device', { devices: userDevices,userGroup,userCanal, name: req.user.name });
//     } catch (error) {
//         res.status(500).json({message:'Error retrieving user devices.'});
//     }
// };
exports.lister_device=(req,res)=>{
    //make a get request to /api/devices
    axios.get('https://gep-iot-jsmw.onrender.com/device/api/devices')
        .then(async function(response){
            console.log(response)
            res.render('lister_device',{devices:response.data,name: req.user.name})
        })
        .catch(err=>{
              res.send(err);
     })
}
exports.update_device=(req,res)=>{
    axios.get('https://gep-iot-jsmw.onrender.com/device/api/devices',{ params : {id:req.query.id }})
        .then(async function(devicedata){
            const groups = await Group.find().exec();
            const canals =await Canal.find().exec();
            res.render("update_device",{device:devicedata.data,groups,canals,name: req.user.name})
        })
        .catch(err =>{
            res.send(err);
        })
    //make a get request to /api/groupes
} 
exports.Adminhome=async (req,res)=>{

    try {
        const groups = await Group.find().exec();
        const canals =await Canal.find().exec()
        res.render('admin/add_device', { devices:"new Data",groups,canals,name: "administrateur"});
      } catch (err) {
        console.error('Error fetching device groups:', err);
        res.status(500).send('Error fetching device groups or device canals.');
      }
   
}
exports.Adminlister_device=(req,res)=>{
    //make a get request to /api/devices
    axios.get('https://gep-iot-jsmw.onrender.com/device/api/devices')
        .then(async function(response){
            console.log(response)
            res.render('admin/lister_device',{devices:response.data,name: "administrateur"})
        })
        .catch(err=>{
              res.send(err);
        })
}
exports.Adminupdate_device=(req,res)=>{
    axios.get('https://gep-iot-jsmw.onrender.com/device/api/devices',{ params : {id:req.query.id }})
        .then(function(devicedata){
            res.render('admin/update_device',{device:devicedata.data,name: "administrateur"})
        })
        .catch(err =>{
            res.send(err);
        })
    //make a get request to /api/groupes
}

