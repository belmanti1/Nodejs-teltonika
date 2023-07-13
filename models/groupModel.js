const mongoose = require('mongoose');
//---------- Group Schema --------------//
const GroupSchema = new mongoose.Schema({
        id_person:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        group_nom:{
            type: String,
            required:true
        }
       
    },{timestamps:true});


const Group = mongoose.model('Group',GroupSchema);
    
module.exports=Group;