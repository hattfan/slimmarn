const DailyRoutine = require('../models/DailyRoutine'),
WorkoutRegister = require('../models/WorkoutRegister'),
Exercise = require('../models/Exercise'),
WorkoutScheduele = require('../models/WorkoutScheduele'),
UserGoal = require('../models/UserGoal'),
User = require('../models/User'),
moment = require('moment');

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
      usersWithWorkouts = usersWithWorkouts.sort((a,b) => (a.timeTrained > b.timeTrained) ? -1 : ((b.timeTrained > a.timeTrained) ? 1 : 0))


      var workoutsForUser = [];
      workouts.filter(workout => workout.userId.toString() === req.user._id.toString()).forEach(workout => {
        workoutsForUser.push({
          workoutTime: workout.workoutRounds * 5, 
          createdat:workout.createdAt})
      });
      UserGoal.find({ userId: req.user._id }).exec((err, userGoal) => {
      
        if (err) { return next(err); }
        res.render('index', {
          title: 'Home',
          usersWithWorkouts: usersWithWorkouts,
          workoutsForUser: workoutsForUser,
          userGoal: userGoal[0].weeklyGoal
        });
      });
    });
  });
};

exports.register = (req, res) => {
  DailyRoutine.findOne({}, {}, { sort: { 'dailyRoutine': -1 } }, (err, dailyRoutine) => {
    if (err) { return next(err); }
    var date = {
      today: moment().format('YYYY-MM-DD'),
      firstAvailableDate: moment().add(-7,'days').format('YYYY-MM-DD')
    }

    res.render('register', {
      title: 'Register Workout',
      dailyRoutine: dailyRoutine,
      date: date
    });
  });
};

exports.otherDateOfWorkout = (req, res) => {
  DailyRoutine.findOne({createdAt: {$gte: moment(req.query.date).startOf('day').toString(), $lt: moment(req.query.date).endOf('day').toString()} }, {}, {}, (err, dailyRoutine) => {
    if (err) { return next(err); }
    res.json(dailyRoutine);
  });
};

exports.alive = (req, res) => {
    res.json("stayin alive");
};

exports.postWorkout = (req, res) => {

  WorkoutRegister.find({
    userId:req.user._id, 
    createdAt: {$gte: moment(req.query.date).startOf('day').toString(), $lt: moment(req.query.date).endOf('day').toString()} 
  }, (err, workouts) => {
    if (err) { return next(err); }
    if(workouts.length > 0){
      req.flash('errors', { msg: `Du har redan ett pass registrerat idag` });
      res.redirect('/');
    }
    else{
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
}

exports.settings = (req, res) => {
  WorkoutScheduele.find({ userId: req.user._id }).exec((err, workoutScheduele) => {
    if (err) { return next(err); }
    UserGoal.find({ userId: req.user._id }).exec((err, userGoal) => {
      
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
