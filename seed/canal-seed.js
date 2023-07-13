const mongoose = require('mongoose');
const db = require('../config/key.js').MongoURI;
const canalModel=require('../models/canalModel.js');

//------------ Mongo Connection ------------//
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch(err => console.log(err));

let newCanal1= new canalModel({
        iden_pers:'64916a7c39bb5c82d0369e45',
        canal_nom: 'test',
        canal_ip: "127.0.0.1",
        canal_port: 1234,
})
let newCanal2= new canalModel({
        iden_pers:'64916a7c39bb5c82d0369e45',
        canal_nom: 'test',
        canal_ip: "127.0.0.1",
        canal_port: 1234,
})
let newCanal3= new canalModel({
        iden_pers:'64916a7c39bb5c82d0369e45',
        canal_nom: 'test',
        canal_ip: "127.0.0.1",
        canal_port: 1234,
})
newCanal1.save((err)=>{
    if(!err){
        console.log('record was added');
    }
    else{
        console.log(err);
    }
})
newCanal2.save((err)=>{
    if(!err){
        console.log('record1 was added');
    }
    else{
        console.log(err);
    }
})
newCanal3.save((err)=>{
    if(!err){
        console.log('record2 was added');
    }
    else{
        console.log(err);
    }
})