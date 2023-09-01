const mongoose= require('mongoose');

  
//---------- Stream Schema ------------//
const StreamSchema = new mongoose.Schema({
        // iden_perso: {
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref:'User'
        // },
        // timestamp: {
        //     type:Date,
        //     required:true
        // },
        identifiant_personne:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        imei_device:{
            type: String,
            required:true,
          },
        port:{
            type: Number,
            required:true,

        },
        nom_group:{
            type: String,
            required:true,
        },
        stream_nom: String,
        timestamp:String,
        priority: Number,
        gps: {
          longitude: Number,
          latitude: Number,
          altitude: Number,
          angle: Number,
          speed: Number,
        },
        event_id: Number,
        properties_count: Number,
        ioElement: [],
        
    },{timestamps:true});


const Stream = mongoose.model('Stream',StreamSchema);

module.exports=Stream;