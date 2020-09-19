const mongoose = require('mongoose');

const spotSchema = new mongoose.Schema({
  name: String,
  lon: String,
  lat: String,
  windDirections: {
    N:String,
    NE:String,
    NW:String,
    E:String,
    W:String,
    SE:String,
    SW:String,
    S:String
  },
  reviews:{
    launchFriendly: Number,
    shallow: Number,
    waves: Number,
    accesibility: Number},
  description: String
}, { timestamps: true });

const Spot = mongoose.model('Spot', spotSchema);

module.exports = Spot;
