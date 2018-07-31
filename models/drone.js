module.exports = (mongoose) => {

  const Schema = mongoose.Schema;

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