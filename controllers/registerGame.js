const Game = require('../models/Game');

exports.index = (req, res) => {
  res.render('registerGame', {
  });
};

exports.postGame = (req, res) => {
  console.log(req.body)
  const game = new Game({
    name: req.body.name,
    setBased: req.body.setBased === "on" ? true : false,
    teamBased: req.body.teamBased  === "on" ? true : false,
    reverseCounting: req.body.reverseCounting === "on" ? true : false
  });
  game.save((err) => {
    if (err) { return next(err); }
    req.flash('success', { msg: `Spelet ${req.body.name} registrerat 👍` });
    res.redirect('/registergame');
  });
};