const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  team1: String,
  team2: String,
  team1set1: Number,
  team1set2: Number,
  team1set3: Number,
  team2set1: Number,
  team2set2: Number,
  team2set3: Number,
  team1setWins: String,
  team2setWins: String,
  game: String,
}, { timestamps: true });

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;
