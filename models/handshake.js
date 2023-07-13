const net = require('net')
module.exports=function handshake(serverAddress,port,imei){
    const client = new net.Socket();
    client.connect(port,serverAddress,()=>{
    const imeiBytes =Buffer.from(imei,'ascii');
    const imeiLength =Buffer.alloc(2);
    imeiLength.writeUInt16BE(imeiBytes.length);
  
    const message=Buffer.concat([imeiLength,imeiBytes]);
    client.write(message);
    });
    client.onLine('data',(data)=>{
      if(data.readUInt8()===1){
        console.log('Handshake successful');
      }else{
        console.log('Handshake failed');
      }
      client.end();
    });
  }
