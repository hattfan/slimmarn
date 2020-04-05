/**
 * GET /
 * Home page.
 */

const User = require('../models/User');
const Match = require('../models/Match');
const Game = require('../models/Game');

exports.index = (req, res) => {
  User.find({}).sort('name').exec((err, allUsers) => {
    if (err) { return next(err); }
    allUsers.unshift("");
    console.log(allUsers);
    Game.find({}).sort('name').exec((err, allGames) => {
      if (err) { return next(err); }
      res.render('registerMatch', {
        title: 'RegisterMatch',
        allUsers: allUsers,
        allGames: allGames
      });
    });
  });
};

exports.postMatch = (req, res) => {
  const match = new Match({
    player1: req.body.player1,
    player1result: req.body.player1result,
    player2: req.body.player2,
    player2result: req.body.player2result,
    player3: req.body.player3,
    player3result: req.body.player3result,
    player4: req.body.player4,
    player4result: req.body.player4result,
    player5: req.body.player5,
    player5result: req.body.player5result,
    player6: req.body.player6,
    player6result: req.body.player6result,
    player7: req.body.player7,
    player7result: req.body.player7result,
    player8: req.body.player8,
    player8result: req.body.player8result,
    comment: req.body.comment,
    game: req.body.game
  });

  match.save((err) => {
    if (err) { return next(err); }
    req.flash('success', { msg: `Matchen i ${req.body.game} är registrerad`});
    res.redirect('/');
  });
};