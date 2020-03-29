const Game = require('../models/Game');

exports.index = (req, res) => {
  res.render('registerGame', {
  });
};

exports.postGame = (req, res) => {
  console.log('postinggame')
  const game = new Game({
    name: req.body.name,
    teamBased: req.body.teamBased,
    reverseCounting: req.body.reverseCounting
  });
  game.save((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
};