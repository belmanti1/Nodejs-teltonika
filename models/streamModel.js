const mongoose= require('mongoose');

  
//---------- Stream Schema ------------//
const StreamSchema = new mongoose.Schema({
        iden_perso: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        id_appareil:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Device'
        },
        id_group:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Group'
        },
        ident_channel:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Canal'
        },
        flux_nom:{
            type: String,
            required:true
        },
       
        battery_current:{
            type: Number,
            required:true
        },
        engine_ignition_status:{
            type: Boolean,
            required:true
        },
        event_priority_enum:{
            type:Number,
            required:true
        },
        external_powersource_voltage:{
            type: Number,
            required:true
        },
        movement_status:{
            type:Boolean,
            required:true
        } 
        ,
        ip_port:{
            type:String,
            required:true
        } 
        ,
        position_altitude:{
            type:Number,
            required:true
        },
        position_direction:{
            type: Number,
            required:true
        },
        position_hdop:{
            type:Number,
            required:true
        },
        position_pdop:{
            type:Number,
            required:true
        },
        position_satelites:{
            type:Number,
            required:true
        },
        position_speed:{
            type:Number,
            required:true
        },
        position_valid:{
            type:Boolean,
            required:true
        },
    },{timestamps:true});


const Stream = mongoose.model('Stream',StreamSchema);

module.exports=Stream;