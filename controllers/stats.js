const User = require('../models/User');
const Match = require('../models/Match');
const Game = require('../models/Game');

exports.index = (req, res) => {
    Game.find({}, (err, allGames) => {
        if (err) { return next(err); }
        User.find({}, (err, allUsers) => {
            if (err) { return next(err); }
            res.render('stats', {
                title: 'Stats',
                users: allUsers,
                games: allGames
            });
        });
    });
};

exports.matches = (req, res) => {
    Match.find({}).sort({'createdAt':1}).exec((err, allMatches) => {
        if (err) { return next(err); }
        res.json(allMatches);
    });
};

exports.users = (req, res) => {
    User.find({}, (err, allUsers) => {
        if (err) { return next(err); }
        res.json(allUsers);
    });
};

exports.games = (req, res) => {
    Game.find({}, (err, allGames) => {
        if (err) { return next(err); }
        res.json(allGames);
    });
};