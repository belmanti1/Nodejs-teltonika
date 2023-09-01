const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const path = require('path')
var net = require('net');
const app = express();

//------------ Passport Configuration ------------//
require('./config/passport')(passport);

//------------ DB Configuration ------------//
const db = require('./config/key').MongoURI;

//------------ Mongo Connection ------------//
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch(err => console.log(err));

//------------ EJS Configuration ------------//
app.use(expressLayouts);
app.use("/assets", express.static('./assets'));
app.set('view engine', 'ejs');
// load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))


//------------ Bodyparser Configuration ------------//
app.use(express.urlencoded({ extended: false }))

//------------ Express session Configuration ------------//
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

//------------ Passport Middlewares ------------//
app.use(passport.initialize());
app.use(passport.session());

//------------ Connecting flash ------------//
app.use(flash());

//------------ Global variables ------------//
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});
//------------ Routes ------------//
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/device',require('./routes/deviceRouter.js'))
app.use('/canal',require('./routes/canalRouter.js'))
app.use('/group',require('./routes/groupRouter.js'))
app.use('/stream',require('./routes/streamRouter.js'))
app.use('/user',require('./routes/auth.js'))
const PORT = process.env.PORT || 3006;

app.listen(PORT, console.log(`Server running on PORT ${PORT}`));
// server net 

// var server = net.createServer(function(connection) {
//   console.log('client connected');

//   connection.on('data', function(data) {
//     // Parse the incoming data
//     var imeiLength = data.readUInt16BE(0); // Read the first two bytes as IMEI length
//     var imei = data.slice(2, imeiLength + 2).toString('hex'); // Extract the IMEI as hex

//     console.log('IMEI:', imei);

//     // Check if server accepts data from this module
//     var acceptData = true; // Example: Assume all data is accepted

//     // Prepare the response
//     var response = Buffer.alloc(1);
//     response.writeUInt8(acceptData ? 0x01 : 0x00, 0); // Write the response as a single byte

//     // Send the response back to the module
//     connection.write(response);

//     // Receive the AVL data packet
//     connection.once('data', function(avlData) {
//       // Parse the AVL data packet and process it
//       var avlDataNumber = avlData.readInt32BE(0); // Read the first four bytes as the data number
//       console.log('Received AVL data number:', avlDataNumber);

//       // Check if the data number matches the received data
//       var dataMatch = true; // Example: Assume the data number matches

//       if (!dataMatch) {
//         // If the data number doesn't match, module should resend the data
//         connection.write(avlData);
//       }
//     });
//   });

//   connection.on('end', function() {
//     console.log('client disconnected');
//   });

//   connection.write('Hello World!\r\n');
//   connection.pipe(connection);
// });

// server.listen(8080, function() {
//   console.log('server is listening');
// });
