
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
exports.settings = function(req, res){
    res.render('settings', { title: 'Express' });
};


