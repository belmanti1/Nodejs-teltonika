const net=require('net');
module.exports=function disconnect(client) {
  client.end();
}