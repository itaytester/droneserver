module.exports = (mongoose) => {
    const Schema = mongoose.Schema;

    var TargetSchema = new Schema({
        type: String,
        position: {lat: Number, lng: Number, alt: Number},
        source: String
    });

    return mongoose.model('Target', TargetSchema, 'targets');
}