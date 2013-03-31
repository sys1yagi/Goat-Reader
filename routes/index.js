/*
 * GET home page.
 */

exports.index = function (req, res) {
    res.render('index', { title: 'GoatReader -Home-' });
    /*
    if (!req.session.isLogin) {
        res.render('login', { title: 'GoatReader -Login-' });
    }
    else {
        res.render('index', { title: 'GoatReader -Home-' });
    }
    */
};
exports.about = function (req, res) {
    res.render('about', { title: 'GoatReader -About-' });

};
exports.settings = function (req, res) {
    res.render('settings', { title: 'GotReader -Settings-' });
    /*
    if (!req.session.isLogin) {
        res.render('login', { title: 'GoatReader -Login-' });
    }
    else {
        res.render('settings', { title: 'GotReader -Settings-' });
    }
    */
};


