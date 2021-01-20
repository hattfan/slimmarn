var nodemailer = require('nodemailer');
var DailyRoutine = require('../models/DailyRoutine');
var WorkoutRegister = require('../models/WorkoutRegister');
var Exercise = require('../models/Exercise');
var WorkoutScheduele = require('../models/WorkoutScheduele');
var WorkoutRegister = require('../models/WorkoutRegister');
var UserGoal = require('../models/UserGoal');
var User = require('../models/User');

exports.index = (req, res) => {
  WorkoutRegister.find({}, (err, workouts) => {
    if (err) { return next(err); }
    User.find({}, (err, users) => {
      if (err) { return next(err); }
      var usersWithWorkouts = [];
      users.forEach(user => {
        var timeTrained = 0;
        workouts.filter(workout => workout.userId.toString() === user._id.toString()).forEach(workout => {
          timeTrained = timeTrained + workout.workoutRounds * 5;
        });
        usersWithWorkouts.push({_id: user._id.toString(), name: user.profile.name, timeTrained: timeTrained})
      })

      var workoutsForUser = {};
      workouts.filter(workout => workout.userId.toString() === user._id.toString()).forEach(workout => {
        workoutsPerUser.push({
          workoutTime: workout.workoutRounds * 5, 
          createdat:workout.createdAt})
      });
      usersWithWorkouts.push({_id: user._id.toString(), name: user.profile.name, timeTrained: timeTrained})
    
      res.render('index', {
        title: 'Home',
        usersWithWorkouts: usersWithWorkouts
      });
    });
  });
};

exports.register = (req, res) => {
  DailyRoutine.findOne({}, {}, { sort: { 'dailyRoutine': -1 } }, (err, dailyRoutine) => {
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
    if (err) { throw (err); }
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
  WorkoutScheduele.find({ userId: req.user._id }).exec((err, workoutScheduele) => {
    if (err) { return next(err); }
    UserGoal.find({ userId: req.user._id }).exec((err, userGoal) => {
      console.log(userGoal);
      
      if (err) { return next(err); }
      res.render('settings', {
        title: 'Settings',
        workoutScheduele: workoutScheduele,
        userGoal: userGoal[0].weeklyGoal
      });
    });
  });
};

exports.postSettings = (req, res) => {
  WorkoutScheduele.findOneAndUpdate({ userId: req.user._id }, {
    $set: {
      days: {
        monday: req.body.monday === 'on' ? true : false,
        tuesday: req.body.tuesday === 'on' ? true : false,
        wednesday: req.body.wednesday === 'on' ? true : false,
        thursday: req.body.thursday === 'on' ? true : false,
        friday: req.body.friday === 'on' ? true : false,
        saturday: req.body.saturday === 'on' ? true : false,
        sunday: req.body.sunday === 'on' ? true : false,
      }
    }
  }, (err, doc) => {
    if (err) { return next(err); }
    req.flash('success', { msg: `Uppdaterat inställningarna` });
    res.redirect('/settings')
  });
};

exports.postGoal = (req, res) => {
  UserGoal.findOneAndUpdate({ userId: req.user._id }, { $set: { weeklyGoal: parseInt(req.body.goalPerWeek) } }, (err, doc) => {
    if (err) { return next(err); }
    req.flash('success', { msg: `Uppdaterat inställningarna` });
    res.redirect('/settings')
  });
};
