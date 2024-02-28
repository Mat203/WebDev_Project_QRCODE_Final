const mongoConnection = require('../connections/mongoConnection');
const mongoose = mongoConnection.mongo;

const QRCodeSchema = new mongoose.Schema({
    name: String,
    link: String,
    important: Boolean,
    image: String,
});

const QRCode = mongoose.model('QRCode', QRCodeSchema);

module.exports = QRCode;
