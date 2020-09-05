const mongoose = require('mongoose');

const spotSchema = new mongoose.Schema({
  name: String,
  lon: String,
  lat: String,
  windDirections: {
    N:String,
    NO:String,
    NV:String,
    O:String,
    V:String,
    SO:String,
    SV:String,
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
