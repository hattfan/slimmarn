var nodemailer = require('nodemailer');
var moment = require('moment');
var emailTemplate = require('../mail/template');
const DailyRoutine = require('../models/DailyRoutine');
const Exercise = require('../models/Exercise');
const User = require('../models/User');

module.exports = {
  mail: function () {
    //Slumpa fram
    // Exercise.find({}, (err, excersices) => {
    //   if (err) { return next(err); }

    //   var dailyRoutine = new DailyRoutine({
    //     dailyRoutine: moment()
    //   });

    //   const uniqueGroups = [...new Set(excersices.map(item => item.Group))];
    //   var groupRandom = Math.round(Math.random());
    //   console.log(groupRandom);
    //   uniqueGroups.forEach(group => {
    //     if (group == "Armar" &&  groupRandom === 0) {
    //     }
    //     else if (group == "Axlar" &&  groupRandom === 1) {}
    //     else {
    //       var excersicesPerGroup = excersices.filter(exersiceGroup => exersiceGroup.Group == group);
    //       dailyRoutine.exersices.push(excersicesPerGroup[Math.floor(Math.random() * Math.floor(excersicesPerGroup.length))])
    //     }
    //   });

    //   dailyRoutine.save((err) => {
    //     if (err) { return next(err); }


    //Maila
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'din.slimbuddy@gmail.com',
        pass: 'Neroxrox5('
      }
    });

    //TODO - Snurra över alla användare
    DailyRoutine.findOne({}, {}, { sort: { 'dailyRoutine': -1 } }, (err, dailyRoutine) => {
      if (err) { return next(err); }
      User.find({}, (err, users) => {
        users.forEach(singleUser => {
          var exersices = "";
          var user = singleUser.profile.name;
          dailyRoutine.exersices.forEach(exersice => {
            exersices = exersices + `
                <tr style="border-bottom: 1px solid rgba(0,0,0,.05);">
                <td valign="middle" width="50%" style="text-align:left; padding: 0 2.5em;">
                <p>${exersice['Name']}</p>
                </td>
                <td valign="middle" width="50%" style="text-align:left; padding: 0 2.5em;">
                  <a href="${exersice['Ref']}">Länk</a>
                </td>
                </tr>`
          });
  
          var templateFunction = require('../mail/template');
  
          var template = templateFunction(user, exersices);
  
          var mailOptions = {
            from: 'din.slimbuddy@gmail.com',
            to: singleUser.email,
            subject: '📅 Dagens träning',
            html: template
          };
  
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        })
      });
    });
    //   });
    // });
  },

  dailyRoutine: function () {
    Exercise.find({}, (err, excersices) => {
      if (err) { return next(err); }

      var dailyRoutine = new DailyRoutine({
        dailyRoutine: moment()
      });

      const uniqueGroups = [...new Set(excersices.map(item => item.Group))];
      var groupRandom = Math.round(Math.random());
      uniqueGroups.forEach(group => {
        if (group == "Armar" && groupRandom === 0) {}
        else if (group == "Axlar" && groupRandom === 1) {}
        else {
          var excersicesPerGroup = excersices.filter(exersiceGroup => exersiceGroup.Group == group);
          dailyRoutine.exersices.push(excersicesPerGroup[Math.floor(Math.random() * Math.floor(excersicesPerGroup.length))])
        }
      });

      dailyRoutine.save((err) => {
        if (err) { return next(err); }
      });
    });
  }
};

