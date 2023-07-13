const net = require('net');
module.exports=function connect(serverAddress, port) {
    const client = new net.Socket();
  
    client.connect(port, serverAddress, () => {
      const message = Buffer.from('Connection request');
  
      client.write(message);
    });
  
    client.on('data', (data) => {
      if (data.readUInt8() === 1) {
        console.log('Connection established');
      } else {
        console.log('Connection refused');
      }
    });
  
    return client;
  }