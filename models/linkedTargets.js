const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var LinkedTargetSchema = new Schema({
    drone_id: String,
    target_id: String
});

module.exports = mongoose.model('LinkedTarget', LinkedTargetSchema, 'linkedTargets');