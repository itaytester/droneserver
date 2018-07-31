const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const http = require('http');
//const cors = require('cors');
const app = express();
const port = process.env.PORT || 1337;


mongoose.connect('mongodb://localhost/mydb');                           // connect mongoose to db
var db = mongoose.connection;                                           // get connection
db.on('error', console.error.bind(console, 'connection error:'));       // on error listener
db.once('open', () => {                                                 // on connection established
  console.log('connected to MongoDB database: mydb');
});

app.set('maxDroneTail', 5)
//app.use(cors())                                                         // use the cors module
app.use('/api/Drones', require('./api/dronesController')(mongoose))       // register the drone controller on /api/Drones/ route
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(port, () => {                                                // listen to port
    console.log("listening in port " + port);
});