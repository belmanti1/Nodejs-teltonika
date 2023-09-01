const axios = require('axios')
exports.lister_canal=(req,res)=>{
    //make a get request to /api/canals
    axios.get('http://localhost:3006/canal/api/canaux')
        .then(function(response){
            console.log(response)
            res.render('lister_canal',{canaux:response.data,name: req.user.name})
        })
        .catch(err=>{
              res.send(err);
        })
}
exports.add_canal=(req,res)=>{
    res.render('add_canal',{canaux:"new Data",name: req.user.name});
}
exports.update_canal=(req,res)=>{
    axios.get('http://localhost:3006/canal/api/canaux',{ params : {id:req.query.id }})
    .then(function(canaldata){
        res.render("update_canal",{canal:canaldata.data,name: req.user.name})
    })
    .catch(err =>{
        res.send(err);
    })
}

exports.Adminlister_canal=(req,res)=>{
    //make a get request to /api/canals
    axios.get('http://localhost:3006/canal/api/canaux')
        .then(function(response){
            console.log(response)
            res.render('admin/lister_canal',{canaux:response.data,name: "administrateur"})
        })
        .catch(err=>{
              res.send(err);
        })
}
exports.Adminadd_canal=(req,res)=>{
    res.render('admin/add_canal',{canaux:"new Data",name: "administrateur"});
}
exports.Adminupdate_canal=(req,res)=>{
    axios.get('http://localhost:3006/canal/api/canaux',{ params : {id:req.query.id }})
    .then(function(canaldata){
        res.render("admin/update_canal",{canal:canaldata.data,name: "administrateur"})
    })
    .catch(err =>{
        res.send(err);
    })
}

