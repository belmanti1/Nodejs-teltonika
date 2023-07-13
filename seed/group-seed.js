const mongoose = require('mongoose');
const db = require('../config/key.js').MongoURI;
const groupModel=require('../models/groupModel.js');

//------------ Mongo Connection ------------//
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch(err => console.log(err));

let newGroup1= new groupModel({
        id_person:'64916a7c39bb5c82d0369e45',
        group_nom:'G1'
})
let newGroup2= new groupModel({
        id_person:'64916a7c39bb5c82d0369e45',
        group_nom:'G2'
})
let newGroup3= new groupModel({
        id_person:'64916a7c39bb5c82d0369e45',
        group_nom:'G3'
})
newGroup1.save((err)=>{
    if(!err){
        console.log('record was added');
    }
    else{
        console.log(err);
    }
})
newGroup2.save((err)=>{
    if(!err){
        console.log('record1 was added');
    }
    else{
        console.log(err);
    }
})
newGroup3.save((err)=>{
    if(!err){
        console.log('record2 was added');
    }
    else{
        console.log(err);
    }
})