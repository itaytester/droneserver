module.exports = (mongoose) => {
  
  //const mongoose = require('mongoose');
  const Schema = mongoose.Schema;

  // mongoose.connect('mongodb://localhost/mydb');                           // connect mongoose to db
  // var db = mongoose.connection;                                           // get connection
  // db.on('error', console.error.bind(console, 'connection error:'));       // on error listener
  // db.once('open', () => {                                                 // on connection established
  //   console.log('connected to MongoDB database: mydb');
  // });

  var DroneSchema = new Schema({
    user_id: String,
    name: String,
    type: String,
    future_pos: { lat: Number, lng: Number },
    gimbal: { yaw: Number, pitch: Number, roll: Number },
    position: { lat: Number, lng: Number, alt: Number },
    speed: { x: Number, y: Number, z: Number },
    target_id: String
  });

  return mongoose.model('Drone', DroneSchema, 'drones');
}