const axios = require('axios')
exports.lister_group=(req,res)=>{
    //make a get request to /api/groupes
    axios.get('http://localhost:3006/group/api/groupes')
        .then(function(response){
            console.log(response)
            res.render('lister_group',{groupes:response.data})
        })
        .catch(err=>{
              res.send(err);
        })
}
exports.add_group=(req,res)=>{
    res.render('add_group',{groupes:"new Data"});
}
exports.update_group=(req,res)=>{
    axios.get('http://localhost:3006/group/api/groupes',{ params : {id:req.query.id }})
        .then(function(groupdata){
            res.render("update_group",{group:groupdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}
