const axios = require('axios');

exports.log=(req,res)=>{
    axios.get('https://gep-iot-jsmw.onrender.com/stream/api/streams')
          .then(function(response){
               console.log(response)
               res.render("log",{streams:response.data,name: req.user.name})
          })
          .catch(err=>{
             res.send(err);
          })
}
exports.add_stream=(req,res)=>{
   axios.get('https://gep-iot-jsmw.onrender.com/device/api/devices',{ params : {id:req.query.id }})
       .then(async function(devicedata){
          
           res.render("add_stream",{device:devicedata.data,name: req.user.name})
       })
       .catch(err =>{
           res.send(err);
       })
   //make a get request to /api/groupes
} 
exports.Adminlog=(req,res)=>{
   axios.get('https://gep-iot-jsmw.onrender.com/stream/api/streams')
         .then(function(response){
              console.log(response)
              res.render("admin/log",{streams:response.data,name: "administrateur"})
         })
         .catch(err=>{
            res.send(err);
         })
}

