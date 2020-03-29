const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  name: String,
  teamBased: Number,
  reverseCounting: Boolean
}, { timestamps: true });

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
