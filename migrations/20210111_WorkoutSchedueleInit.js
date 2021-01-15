const mongoose = require('mongoose');
var WorkoutScheduele = require('../models/WorkoutScheduele');
var User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env.example' });

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

User.find({}, (err, users) => {
    if (err) { return next(err); }
    console.log(users);
    
    users.forEach( user => {
        var workoutScheduele = new WorkoutScheduele({
            userId: user._id,
            days: {
                monday : true,
                tuesday : false,
                wednesday : true,
                thursday : false,
                friday : true,
                saturday : false,
                sunday : false
            }
        });
        workoutScheduele.save((err) => {
            if (err) { throw(err); }
            console.log('Registrerat');
        });
    })
});
