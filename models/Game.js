const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  name: String,
  teamBased: Boolean,
  setBased: Boolean,
  reverseCounting: Boolean,
  icon: String,
}, { timestamps: true });

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
