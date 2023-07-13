const axios = require('axios');
exports.homeStream=(req,res)=>{
     //make a get request to /api/groupes
     axios.get('http://localhost:3006/stream/api/streams')
     .then(function(response){
         console.log(response)
         res.render('lister_stream',{streams:response.data})
     })
     .catch(err=>{
           res.send(err);
     })
}
exports.add_stream=(req,res)=>{
    res.render('add_stream',{streams:"new Data"});
}
exports.update_stream=(req,res)=>{
    axios.get('http://localhost:3006/stream/api/streams',{ params : {id:req.query.id }})
    .then(function(streamdata){
        res.render("update_stream",{stream:streamdata.data})
    })
    .catch(err =>{
        res.send(err);
    })
}
