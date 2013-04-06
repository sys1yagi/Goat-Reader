/*
 * GET home page.
 */

exports.index = function (req, res) {
    res.render('index', { title: 'GoatReader -Home-', session_token: req.session.session_token });
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
    res.render('about', { title: 'GoatReader -About-', session_token: req.session.session_token });

};
exports.settings = function (req, res) {
    res.render('settings', { title: 'GotReader -Settings-', session_token: req.session.session_token });
    /*
    if (!req.session.isLogin) {
        res.render('login', { title: 'GoatReader -Login-' });
    }
    else {
        res.render('settings', { title: 'GotReader -Settings-' });
    }
    */
};


