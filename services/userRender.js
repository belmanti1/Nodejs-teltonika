const axios = require('axios');
exports.lister_user=(req,res)=>{
     //make a get request to /api/groupes
     axios.get('http://localhost:3006/user/api/users')
     .then(function(response){
         console.log(response)
         res.render('lister_user',{users:response.data,name: "administrateur"})
     })
     .catch(err=>{
           res.send(err);
     })
}
exports.add_user=(req,res)=>{
    res.render('add_user',{users:"new Data",name: "administrateur"});
}
exports.update_user=(req,res)=>{
    axios.get('http://localhost:3006/user/api/users',{ params : {id:req.query.id }})
    .then(function(userdata){
        res.render("update_user",{user:userdata.data,name: "administrateur"})
    })
    .catch(err =>{
        res.send(err);
    })
}
