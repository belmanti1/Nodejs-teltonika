var Stream= require('../models/streamModel.js');
var Device = require('../models/deviceModel.js');
var User = require('../models/User.js');
var Canal=require('../models/canalModel.js');
var Group= require('../models/groupModel.js');

const net = require('net');
const Parser = require('../node_modules/teltonika-parser-fix');
const binutils = require('../node_modules/binutils64');
const Codec8e = require('../node_modules/teltonika-parser-fix/codecs/codec8');


exports.create = async (req,res) => {

    const buffer = "00000000000004B78E0E00000188DA1139B000FB4628AA133473B801E001020B00000000000D000600EF0000F00000150400C800004501007100000600B5000B00B60008004227F2001800000043000000440000000100F10000EBF00000000000000188DA113D9800FB4628AA133473B801E001020B00000000000D000600EF0000F00000150400C800004501007100000600B5000B00B60008004227F2001800000043000000440000000100F10000EBF00000000000000188DA11418000FB4628AA133473B801E001020B00000000000D000600EF0000F00000150400C800004501007100000600B5000B00B60008004227F2001800000043000000440000000100F10000EBF00000000000000188DA11456800FB4628AA133473B801E001020B00000000000D000600EF0000F00000150400C800004501007100000600B5000B00B60008004227EF001800000043000000440000000100F10000EBF00000000000000188DA11495000FB4628AA133473B801E001020B00000000000D000600EF0000F00000150400C800004501007100000600B5000B00B60008004227EA001800000043000000440000000100F10000EBF00000000000000188DA114D3800FB4628AA133473B801E001020B00000000000D000600EF0000F00000150400C800004501007100000600B5000B00B60008004227ED001800000043000000440000000100F10000EBF00000000000000188DA11512000FB4628AA133473B801E001020B00000000000D000600EF0000F00000150400C800004501007100000600B5000B00B60008004227F1001800000043000000440000000100F10000EBF00000000000000188DA11550800FB4628AA133473B801E001020A00000000000D000600EF0000F00000150400C800004501007100000600B5000B00B60008004227F2001800000043000000440000000100F10000EBF00000000000000188DA1158F000FB4628AA133473B801E001020B00000000000D000600EF0000F00000150400C800004501007100000600B5000B00B60008004227F4001800000043000000440000000100F10000EBF00000000000000188DA115CD800FB4628AA133473B801E001020B00000000000D000600EF0000F00000150400C800004501007100000600B5000B00B60008004227F7001800000043000000440000000100F10000EBF00000000000000188DA1160C000FB4628AA133473B801E001020B00000000000D000600EF0000F00000150400C800004501007100000600B5000B00B60008004227F3001800000043000000440000000100F10000EBF00000000000000188DA1164A800FB4628AA133473B801E001020B00000000000D000600EF0000F00000150400C800004501007100000600B5000B00B60008004227F2001800000043000000440000000100F10000EBF00000000000000188DA11689000FB4628AA133473B801E001020B00000000000D000600EF0000F00000150400C800004501007100000600B5000B00B60008004227F2001800000043000000440000000100F10000EBF00000000000000188DA116C7800FB4628AA133473B801E001020B00000000000D000600EF0000F00000150400C800004501007100000600B5000B00B60008004227F2001800000043000000440000000100F10000EBF0000000000E0000F7A1";
    const string = Buffer.from(buffer, "hex");
    const parser = new Parser(string);

    const records = parser._codec.avlObj.records;
    console.log("records saved:", records);
      /*if (!Array.isArray(records)) {
        console.error("Records are not properly defined.");
        return;
      }*/
    const currentUserId= req.user.id;
   // Find the user by ID and retrieve their name
    const user = await User.findById(currentUserId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const { group_nom,canal_port } = req.body;

    
 for (const record of records) {
   const newStream = new Stream({
     identifiant_personne:currentUserId,
     imei_device:req.body.imei,
     port:canal_port,
     nom_group:group_nom,
     stream_nom:req.body.stream_nom,
     timestamp: record.timestamp,
     priority: record.priority,
     gps: {
       longitude: record.gps.longitude,
       latitude: record.gps.latitude,
       altitude: record.gps.altitude,
       angle: record.gps.angle,
       speed: record.gps.speed,
     },
     event_id: record.event_id,
     properties_count: record.properties_count,
     ioElement: record.ioElement,
   });

   try {
     const savedStream = await newStream.save();
     console.log("Stream saved:", savedStream);
   } catch (err) {
     console.error("Error while saving stream:", err);
   }
 }
};
// retrieve and return all streams/retrieve and return a single stream
exports.find=(req,res)=>{
          const id=req.query.id;
          Device.findById(id)
             .then(data=>{
                 if(!data){
                  res.status(404).send({message:"Not found group with id" +id})
                 }else{
                   res.send(data)
                 }
             })
             .catch(err=>{
                 res.send(500).send({message:"Error retriving group with id"+id})
      })   
}
exports.findAll=(req,res)=>{
  if(req.query.id){
    const id=req.query.id;
    Stream.findById(id)
       .populate('ident_personne','name')
       .then(data=>{
           if(!data){
            res.status(404).send({message:"Not found device with id" +id})
           }else{
             res.send(data)
           }
       })
       .catch(err=>{
           res.send(500).send({message:"Error retriving device with id"+id})
       })
}else{ 
    Stream.find()
        .populate('ident_personne','name')
        .then(data=>{
          res.send(data)
        })
        .catch(err=>{
          res.status(500).send({ message:err.message || "Error Occured while retriving device information"})
        })
}     
}

// update a new identified Stream by Stream id 
// exports.update=(req,res)=>{
//       if(!req.body){
//         return res
//            .status(400)
//            .send({ message :"Data to update can note be empty"})
//       }
//       const id=req.params.id;
//       Stream.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
//          .then(data=>{
//             if(!data){
//               res.status(404).send({message:`Cannot Update Stream with${id}.Maybe Stream not found!`})
//             }
//             else{
//               res.send(data)
//             }
//          })
//          .catch(err =>{
//           res.status(500).send({message:"Error Update Stream information"})
//          })
// }
// Delete a Stream with specified stream id  in the request
// exports.delete=(req,res)=>{
//      const id =req.params.id;

//      Stream.findByIdAndDelete(id)
//        .then(data=>{
//            if(!data){
//             res.status(404).send({message:`Cannot Delete with id ${id}.Maybe id is wrong`})
//            }else{
//               res.send({
//                 message:"Stream was delete successfully!"
//               })
//            }
//        })
//        .catch(err => {
//         res.status(500).send({
//           message:"Could not delete Stream with id="+id
//         })
//        });
// }