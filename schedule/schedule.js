var nodemailer = require('nodemailer');
var moment = require('moment');
var emailTemplate = require('../mail/template');
const DailyRoutine = require('../models/DailyRoutine');
const Exercise = require('../models/Exercise');
const User = require('../models/User');
const WorkoutScheduele = require('../models/WorkoutScheduele');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  "538559185697-23moahm6662l92t9enj3p1nr8r3pm1bv.apps.googleusercontent.com", // ClientID
  "8EssV0biegJUtHKsO63hT0_j", // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: "1//04nfTsou6PS1ICgYIARAAGAQSNwF-L9IrSZGGkeQPXLx2F8k9NUrCaicu_jxvPyUwIpM4ASFE90Zfdo1-GuIphkm-LlCiFDlpcnE"
});


oauth2Client.setCredentials({
  refresh_token: "1//04nfTsou6PS1ICgYIARAAGAQSNwF-L9IrSZGGkeQPXLx2F8k9NUrCaicu_jxvPyUwIpM4ASFE90Zfdo1-GuIphkm-LlCiFDlpcnE"
});
const accessToken = oauth2Client.getAccessToken()

const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "din.slimbuddy@gmail.com",
    clientId: "538559185697-23moahm6662l92t9enj3p1nr8r3pm1bv.apps.googleusercontent.com",
    clientSecret: "8EssV0biegJUtHKsO63hT0_j",
    refreshToken: "1//04nfTsou6PS1ICgYIARAAGAQSNwF-L9IrSZGGkeQPXLx2F8k9NUrCaicu_jxvPyUwIpM4ASFE90Zfdo1-GuIphkm-LlCiFDlpcnE",
    accessToken: accessToken
  },
  tls: {
    rejectUnauthorized: false
  }
});


module.exports = {
  mail: function () {



    //Maila
    // var transporter = nodemailer.createTransport({

    //   service: 'gmail',
    //   host: 'smtp.gmail.com',
    //   auth: {
    //     user: 'din.slimbuddy@gmail.com',
    //     pass: 'Neroxrox5('
    //   }
    // });
    var templateFunction = require('../mail/template');

    //TODO - Snurra över alla användare
    DailyRoutine.findOne({}, {}, { sort: { 'dailyRoutine': -1 } }, (err, dailyRoutine) => {
      if (err) { return next(err); }
      User.find({}, (err, users) => {
        WorkoutScheduele.find({}, (err, schedueles) => {
          users.forEach(singleUser => {
            var scheduele = schedueles.filter(scheduele => scheduele.userId.toString() === singleUser._id.toString());

            if (scheduele[0].days[matchDayOfWeek()]) {
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

              var template = templateFunction(user, exersices);

              //OAuth
              const mailOptions = {
                from: 'din.slimbuddy@gmail.com',
                to: singleUser.email,
                subject: '📅 Dagens träning',
                html: template,
              };

              smtpTransport.sendMail(mailOptions, (error, response) => {
                error ? console.log(error) : console.log(response);
                smtpTransport.close();
              });

              // var mailOptions = {
              //   from: 'din.slimbuddy@gmail.com',
              //   to: singleUser.email,
              //   subject: '📅 Dagens träning',
              //   html: template
              // };

              // transporter.sendMail(mailOptions, function (error, info) {
              //   if (error) {
              //     console.log(error);
              //   } else {
              //     console.log('Email sent: ' + info.response);
              //   }
              // });
            }
          });
        });
      });
    });
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
        if (group == "Armar" && groupRandom === 0) { }
        else if (group == "Axlar" && groupRandom === 1) { }
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

function matchDayOfWeek() {
  const date = moment();
  const dow = date.day();
  switch (dow) {
    case 1:
      return 'monday';
    case 2:
      return 'tuesday';
    case 3:
      return 'wednesday';
    case 4:
      return 'thursday';
    case 5:
      return 'friday';
    case 6:
      return 'saturday';
    case 7:
      return 'sunday';

    default:
  }
}