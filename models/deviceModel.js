const mongoose= require('mongoose');

//---------- Stream Schema ------------//
const DeviceSchema= new mongoose.Schema({
        ident_personne:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        ident_group:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Group'
           },
        ident_canal:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Canal'
        },
        imei:{
            type: String,
            required:true,
            unique:true
        },
        device_nom:{
            type: String,
            required:true,
            unique:true
        }        
    }, { timestamps: true });

const Device = mongoose.model('Device', DeviceSchema);
    
module.exports = Device;