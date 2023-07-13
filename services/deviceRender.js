const axios =require('axios')
exports.home=(req,res)=>{
    res.render('add_device',{devices:"new Data"});
}
exports.lister_device=(req,res)=>{
    //make a get request to /api/devices
    axios.get('http://localhost:3006/device/api/devices')
        .then(function(response){
            console.log(response)
            res.render('lister_device',{devices:response.data})
        })
        .catch(err=>{
              res.send(err);
        })
}

exports.update_device=(req,res)=>{
    axios.get('http://localhost:3006/device/api/devices',{ params : {id:req.query.id }})
        .then(function(devicedata){
            res.render("update_device",{device:devicedata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}
