const mongoose = require('mongoose');
var User = require('./User');

const releaseModalSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  note: String,
  read: Boolean
}, { timestamps: true });

var releaseModal = mongoose.model('releaseModal', releaseModalSchema);

module.exports = releaseModal;
