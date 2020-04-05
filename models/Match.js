const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  player1: String,
  player1result: Number,
  player2: String,
  player2result: Number,
  player3: String,
  player3result: Number,
  player4: String,
  player4result: Number,
  player5: String,
  player5result: Number,
  player6: String,
  player6result: Number,
  player7: String,
  player7result: Number,
  player8: String,
  player8result: Number,
  comment: String,
  game: String
}, { timestamps: true });

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;
