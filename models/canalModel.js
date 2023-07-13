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
    required: true
  },
  canal_ip: {
    type: String,
    required: true
  },
  canal_port: {
    type: String,
    required: true
  },
  
}, { timestamps: true });

const Canal = mongoose.model('Canal', CanalSchema);

module.exports = Canal;