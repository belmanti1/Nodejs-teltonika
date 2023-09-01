const mongoose = require('mongoose');

const TcpServerSchema = new mongoose.Schema({
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Canal'
  },
  serverInstance: {
    type: String, // Store relevant TCP server information or instance ID
    required: true
  },
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


const TcpServer = mongoose.model('TcpServer',TcpServerSchema);

module.exports=TcpServer;