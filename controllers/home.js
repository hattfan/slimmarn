/* eslint-disable */
const DailyRoutine = require('../models/DailyRoutine'),
  WorkoutRegister = require('../models/WorkoutRegister'),
  Exercise = require('../models/Exercise'),
  WorkoutScheduele = require('../models/WorkoutScheduele'),
  UserGoal = require('../models/UserGoal'),
  Bet = require('../models/Bet'),
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
        usersWithWorkouts.push({ _id: user._id.toString(), name: user.profile.name, timeTrained: timeTrained })
      })

      
      var usersWithWorkoutsCurrentMonth = [];
      var currentMonthWorkouts = workouts.filter(workout => moment(workout.createdAt).format('YYYY') === moment().format('YYYY') && moment(workout.createdAt).format('MM') === moment().format('MM'))
      users.forEach(user => {
        var timeTrained = 0;
        currentMonthWorkouts.filter(workout => workout.userId.toString() === user._id.toString()).forEach(workout => {
          timeTrained = timeTrained + workout.workoutRounds * 5;
        });
        usersWithWorkoutsCurrentMonth.push({ _id: user._id.toString(), name: user.profile.name, timeTrained: timeTrained })
      })
      
      usersWithWorkouts = usersWithWorkouts.sort((a, b) => (a.timeTrained > b.timeTrained) ? -1 : ((b.timeTrained > a.timeTrained) ? 1 : 0))
      usersWithWorkoutsCurrentMonth = usersWithWorkoutsCurrentMonth.sort((a, b) => (a.timeTrained > b.timeTrained) ? -1 : ((b.timeTrained > a.timeTrained) ? 1 : 0))

      var workoutsForUser = [];
      workouts.filter(workout => moment(workout.createdAt).format('YYYY') === moment().format('YYYY') && workout.userId.toString() === req.user._id.toString()).forEach(workout => {
        workoutsForUser.push({
          workoutTime: workout.workoutRounds * 5,
          createdat: workout.createdAt
        })
      });
      UserGoal.find({ userId: req.user._id }).exec((err, userGoal) => {

        if (err) { return next(err); }
        res.render('index', {
          title: 'Home',
          usersWithWorkouts: usersWithWorkouts,
          usersWithWorkoutsCurrentMonth: usersWithWorkoutsCurrentMonth,
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
      firstAvailableDate: moment().add(-7, 'days').format('YYYY-MM-DD')
    }

    WorkoutRegister.find({userId:req.user._id}, (err, workouts) => {
      if (err) { return next(err); }
      console.log('workouts.length', workouts.length)
      res.render('register', {
        title: 'Register Workout',
        dailyRoutine: dailyRoutine,
        date: date,
        userHasRegisteredWorkout: workouts.length > 0 ? true: false,
      });
    });
  });
};

exports.otherDateOfWorkout = (req, res) => {
  DailyRoutine.findOne({ createdAt: { $gte: moment(req.query.date).startOf('day').toString(), $lt: moment(req.query.date).endOf('day').toString() } }, {}, {}, (err, dailyRoutine) => {
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

exports.postPanicWorkout = (req, res) => {
  const workoutRegister = new WorkoutRegister({
    userId: req.body.userId,
    workoutRounds: Number(req.body.panicWorkoutMinutes/5)
  });
    
  workoutRegister.save((err) => {
    if (err) { throw (err); }
    req.flash('success', { msg: `Panik-workout är registrerad` });
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
}

exports.bet = (req, res) => {
  User.find({}, (err, users) => {
    if (err) { return next(err); }
    res.render('bet', {
      today: moment().format('YYYY-MM-DD'),
      userId: req.user._id,
      users: users
    });
  });
};

exports.createBet = (req, res) => {
  const bet = new Bet({
    betFinalization: Number,
    betDescription: String,
    betType: String,
    betFinalDate: Date,
    betStartDate: Date,
    
  });
  
  res.redirect('/bet');
};

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

exports.home = (req, res) => {
  res.render('landing')
};

exports.sneakPeak = (req, res) => {
  var user = {
    _id:'6004a8a335f8dd3918b1ee4b',
    profile:{
      name:'SneakPeak'
    }
  };

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
        usersWithWorkouts.push({ _id: user._id.toString(), name: user.profile.name, timeTrained: timeTrained })
      })

      
      var usersWithWorkoutsCurrentMonth = [];
      var currentMonthWorkouts = workouts.filter(workout => moment(workout.createdAt).format('MM') === moment().format('MM'))
      users.forEach(user => {
        var timeTrained = 0;
        currentMonthWorkouts.filter(workout => workout.userId.toString() === user._id.toString()).forEach(workout => {
          timeTrained = timeTrained + workout.workoutRounds * 5;
        });
        usersWithWorkoutsCurrentMonth.push({ _id: user._id.toString(), name: user.profile.name, timeTrained: timeTrained })
      })
      
      usersWithWorkouts = usersWithWorkouts.sort((a, b) => (a.timeTrained > b.timeTrained) ? -1 : ((b.timeTrained > a.timeTrained) ? 1 : 0))
      usersWithWorkoutsCurrentMonth = usersWithWorkoutsCurrentMonth.sort((a, b) => (a.timeTrained > b.timeTrained) ? -1 : ((b.timeTrained > a.timeTrained) ? 1 : 0))

      var workoutsForUser = [];
      workouts.filter(workout => moment(workout.createdat).format('YYYY') === moment().format('YYYY') && workout.userId.toString() === user._id.toString()).forEach(workout => {
        workoutsForUser.push({
          workoutTime: workout.workoutRounds * 5,
          createdat: workout.createdAt
        })
      });
      UserGoal.find({ userId: user._id }).exec((err, userGoal) => {

        if (err) { return next(err); }
        res.render('index', {
          title: 'Home',
          usersWithWorkouts: usersWithWorkouts,
          usersWithWorkoutsCurrentMonth: usersWithWorkoutsCurrentMonth,
          workoutsForUser: workoutsForUser,
          userGoal: userGoal[0].weeklyGoal,
          disabled: true,
          user: user
        });
      });
    });
  });
};