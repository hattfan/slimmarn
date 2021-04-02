const mongoose = require('mongoose');
var User = require('./User');

const betSchema = new mongoose.Schema({
  betFinalization: Number,
  betDescription: String,
  betType: String,
  betFinalDate: Date,
  betStartDate: Date,
  users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}] 
}, { timestamps: true });

var bet = mongoose.model('bet', betSchema);

module.exports = bet;
