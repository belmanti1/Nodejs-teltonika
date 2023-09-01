const mongoose = require('mongoose');
const db = require('../config/key.js').MongoURI;
const deviceModel=require('../models/deviceModel.js');

//------------ Mongo Connection ------------//
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch(err => console.log(err));

let newDevice1= new deviceModel({
    ident_personne: '64916a7c39bb5c82d0369e45',
    imei: '153457745141875',
    device_nom:'TST100',
    status:'ACTIVE'  
})
let newDevice2= new deviceModel({
    ident_personne: '64916a7c39bb5c82d0369e45',
    imei: '153457745142457',
    device_nom:'TST100',
    status:'ACTIVE'  
})
let newDevice3= new deviceModel({
    ident_personne: '64916a7c39bb5c82d0369e45',
    imei: '153457745141512',
    device_nom:'TST100',
    status:'ACTIVE'  
})
newDevice1.save((err)=>{
    if(!err){
        console.log('record was added');
    }
    else{
        console.log(err);
    }
})

newDevice2.save((err)=>{
    if(!err){
        console.log('record1 was added');
    }
    else{
        console.log(err);
    }
})
newDevice3.save((err)=>{
    if(!err){
        console.log('record2 was added');
    }
    else{
        console.log(err);
    }
})