const mongoose = require('mongoose');
var User = require('./User');

const workoutSchedueleSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  days: {
    monday : Boolean,
    tuesday : Boolean,
    wednesday : Boolean,
    thursday : Boolean,
    friday : Boolean,
    saturday : Boolean,
    sunday : Boolean
  },
}, { timestamps: true });

var workoutScheduele = mongoose.model('workoutScheduele', workoutSchedueleSchema);

module.exports = workoutScheduele;
