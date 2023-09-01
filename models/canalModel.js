const mongoose = require('mongoose');

const CanalSchema = new mongoose.Schema({
   iden_pers:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  // identi_group:{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref:'Group'
  // },
  canal_nom: {
    type: String,
    required: true,
    
  },
  canal_port: {
    type: Number,
    required: true,
   
  },
  tcpServer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'TCPServer'
  },
  tcpServerRunning:{
    type:Boolean,
    default:false
  }
  
}, { timestamps: true });

const Canal = mongoose.model('Canal', CanalSchema);

module.exports = Canal;