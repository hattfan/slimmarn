/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('home', {
    title: 'Home'
  });
};


exports.marathon = (req, res) => {
  res.render('marathon', {
    title: 'marathon'
  });
};

exports.stats = (req, res) => {
  res.render('stats', {
    title: 'stats'
  });
};
