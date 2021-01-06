const mongoose = require('mongoose');
var DailyRoutine = require('./DailyRoutine');
var User = require('./User');

const workoutRegisterSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  dailyRoutineId: {type: mongoose.Schema.Types.ObjectId, ref: 'DailyRoutine'},
  workoutRounds: Number
}, { timestamps: true });

var workoutRegister = mongoose.model('workoutRegister', workoutRegisterSchema);

module.exports = workoutRegister;
