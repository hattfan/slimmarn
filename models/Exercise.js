const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  Name: String,
  Group: String,
  Tool: String,
  MuscleGroupMain: String,
  MuscleGroupSecond: String,
  Ref: String
}, { timestamps: true });

const Exercise = mongoose.model('exercises', exerciseSchema);

module.exports = Exercise;
