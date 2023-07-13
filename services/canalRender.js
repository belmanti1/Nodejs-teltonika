const axios = require('axios')
exports.lister_canal=(req,res)=>{
    //make a get request to /api/canals
    axios.get('http://localhost:3006/canal/api/canaux')
        .then(function(response){
            console.log(response)
            res.render('lister_canal',{canaux:response.data})
        })
        .catch(err=>{
              res.send(err);
        })
}
exports.add_canal=(req,res)=>{
    res.render('add_canal',{canaux:"new Data"});
}
exports.update_canal=(req,res)=>{
    axios.get('http://localhost:3006/canal/api/canaux',{ params : {id:req.query.id }})
    .then(function(canaldata){
        res.render("update_canal",{canal:canaldata.data})
    })
    .catch(err =>{
        res.send(err);
    })
}
