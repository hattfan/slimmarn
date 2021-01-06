const mongoose = require('mongoose');
var Exercise = require('./Exercise');

const dailyRoutineSchema = new mongoose.Schema({
  dailyRoutine: Date,
  exersices: [Exercise.schema]
}, { timestamps: true });

var dailyRoutine = mongoose.model('dailyRoutine', dailyRoutineSchema);

module.exports = dailyRoutine;
