var nodemailer = require('nodemailer');
var DailyRoutine = require('../models/DailyRoutine');
var WorkoutRegister = require('../models/WorkoutRegister');
var Exercise = require('../models/Exercise');
var WorkoutRegister = require('../models/WorkoutRegister');
var User = require('../models/User');

exports.index = (req, res) => {
  WorkoutRegister.find({}, (err, workouts) => {
    if (err) { return next(err); }
    User.find({}, (err, users) => {
      if (err) { return next(err); }
      var timeTrained = 0
      workouts.filter(workout => workout.userId.str === req.user._id.str).forEach(workout => {
        timeTrained = timeTrained + workout.workoutRounds * 5})
      res.render('index', {
        title: 'Home',
        workouts: workouts,
        users: users,
        timeTrained: timeTrained 
      });
    });
  });
};

exports.register = (req, res) => {
  DailyRoutine.findOne({},{}, { sort: {'dailyRoutine':-1} }, (err, dailyRoutine) => {
    if (err) { return next(err); }
    res.render('register', {
      title: 'Register Workout',
      dailyRoutine: dailyRoutine
    });
  });
};

exports.postWorkout = (req, res) => {
  const workoutRegister = new WorkoutRegister({
    userId: req.body.userId,
    dailyRoutineId: req.body.dailyRoutineId,
    workoutRounds: req.body.workoutRounds
  });

  workoutRegister.save((err) => {
    if (err) { throw(err); }
    req.flash('success', { msg: `Dagens workout är registrerad` });
    res.redirect('/');
  });
}

exports.exercises = (req, res) => {
  Exercise.find({}).sort({ 'Group': 1, 'Name': 1 }).exec((err, exercises) => {
    if (err) { return next(err); }
    res.render('exercises', {
      title: 'Exercises',
      exercises: exercises
    });
  });
};

exports.settings = (req, res) => {
    res.render('settings', {
      title: 'Exercises',
  });
};