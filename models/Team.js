const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: String,
  player1: String,
  player2: String,
  icon: String,
}, { timestamps: true });

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
