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