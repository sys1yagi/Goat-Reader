
/*
 * GET home page.
 */

exports.index = function(req, res){
  console.log(req.session);
  req.session.oauth = "none";

  res.render('index', { title: 'GoatReader -Home-' });
};
exports.about = function(req, res){
    console.log(req.session);
    res.render('about', { title: 'GoatReader -About-' });
};
exports.settings = function(req, res){
    console.log(req.session);
    res.render('settings', { title: 'GotReader -Settings-' });
};


