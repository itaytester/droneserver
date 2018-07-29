const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TargetSchema = new Schema({
    type: String,
    position: {lat: number, lng: number, alt: number},
    source: String
});

module.exports = mongoose.model('Target', TargetSchema, 'targets');