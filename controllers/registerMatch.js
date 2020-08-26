/**
 * GET /
 * Home page.
 */

const User = require('../models/User');
const Match = require('../models/Match');
const Game = require('../models/Game');

exports.index = (req, res) => {
  res.render('registerMatch', {
    title: 'Registermatch'
  });
};

exports.postMatch = (req, res) => {
  setWins = calculateSetWins(req.body);
  const match = new Match({
    team1: req.body.team1,
    team2: req.body.team2,
    team1set1: req.body["team1-set1"],
    team1set2: req.body["team1-set2"],
    team1set3: req.body["team1-set3"],
    team2set1: req.body["team2-set1"],
    team2set2: req.body["team2-set2"],
    team2set3: req.body["team2-set3"],
    team1setWins: setWins.team1counter,
    team2setWins: setWins.team2counter,
    game: req.body.game
  });

  match.save((err) => {
    if (err) { return next(err); }
    req.flash('success', { msg: `Matchen mellan ${req.body.team1} och ${req.body.team2} är registrerad` });
    res.redirect('/');
  });
};

function calculateSetWins(results){
  team1counter = 0;
  team2counter = 0;
  if(results["team1-set1"] > results["team2-set1"]){team1counter++;}
  if(results["team1-set2"] > results["team2-set2"]){team1counter++;}
  if(results["team1-set3"] > results["team2-set3"]){team1counter++;}
  if(results["team2-set1"] > results["team1-set1"]){team2counter++;}
  if(results["team2-set2"] > results["team1-set2"]){team2counter++;}
  if(results["team2-set3"] > results["team1-set3"]){team2counter++;}
  setCounter = {
    'team1counter': team1counter,
    'team2counter': team2counter
  };
  return setCounter;
}