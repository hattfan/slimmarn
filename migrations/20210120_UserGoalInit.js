const mongoose = require('mongoose');
var UserGoal = require('../models/UserGoal');
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
    
    users.forEach( user => {
        var userGoal = new UserGoal({
            userId: user._id,
            weeklyGoal: 45
        });
        userGoal.save((err) => {
            if (err) { throw(err); }
            console.log('Registrerat');
        });
    })
});
