const mongoose = require('mongoose');
var User = require('./User');

const userGoalSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  weeklyGoal: Number
}, { timestamps: true });

var userGoal = mongoose.model('userGoal', userGoalSchema);

module.exports = userGoal;
