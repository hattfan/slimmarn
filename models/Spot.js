const mongoose = require('mongoose');

const spotSchema = new mongoose.Schema({
  name: String,
  lon: String,
  lat: String
}, { timestamps: true });

const Spot = mongoose.model('Spot', spotSchema);

module.exports = Spot;
