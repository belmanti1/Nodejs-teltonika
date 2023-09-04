const axios = require('axios');
const Canal=require('../models/canalModel');

exports.lister_group=(req,res)=>{
    //make a get request to /api/groupes
    axios.get('http://localhost:3006/group/api/groupes')
        .then(function(response){
            console.log(response)
            res.render('lister_group',{groupes:response.data,name: req.user.name})
        })
        .catch(err=>{
              res.send(err);
        })
}
exports.add_group=async (req,res)=>{
   try{
    const canals =await Canal.find().exec()
        res.render('add_group', { groups:"new Data",canals ,name: req.user.name});
      } catch (err) {
        console.error('Error fetching device groups:', err);
        res.status(500).send('Error fetching device groups or device canals.');
      }
}
exports.update_group=(req,res)=>{
    axios.get('https://gep-iot-jsmw.onrender.com/group/api/groupes',{ params : {id:req.query.id }})
        .then(function(groupdata){
            res.render("update_group",{group:groupdata.data,name: req.user.name})
        })
        .catch(err =>{
            res.send(err);
        })
}
exports.Adminlister_group=(req,res)=>{
    //make a get request to /api/groupes
    axios.get('https://gep-iot-jsmw.onrender.com/group/api/groupes')
        .then(function(response){
            console.log(response)
            res.render('admin/lister_group',{groupes:response.data,name: "administrateur"})
        })
        .catch(err=>{
              res.send(err);
        })
}
exports.Adminadd_group=async (req,res)=>{
   try{
    const canals =await Canal.find().exec()
        res.render('admin/add_group', { groups:"new Data",canals,name: "administrateur" });
      } catch (err) {
        console.error('Error fetching device groups:', err);
        res.status(500).send('Error fetching device groups or device canals.');
      }
}
exports.Adminupdate_group=(req,res)=>{
    axios.get('https://gep-iot-jsmw.onrender.com/group/api/groupes',{ params : {id:req.query.id }})
        .then(function(groupdata){
            res.render("admin/update_group",{group:groupdata.data,name: "administrateur"})
        })
        .catch(err =>{
            res.send(err);
        })
}
