var UserModelDao = require("../modules/model/UserModelDao");

exports.index = function (req, res) {
    UserModelDao.getUser(req, function (user) {
        var token = null;
        if (user.user_id !== "null") {
            token = req.session.session_token;
        }
        res.render('index', { title: 'GoatReader -Home-', session_token: token });
    });
};
exports.about = function (req, res) {
    UserModelDao.getUser(req, function (user) {
        var token = null;
        if (user.user_id !== "null") {
            token = req.session.session_token;
        }
        res.render('about', { title: 'GoatReader -About-', session_token: token });
    });
};
exports.settings = function (req, res) {
    UserModelDao.getUser(req, function (user) {
        var token = null;
        if (user.user_id !== "null") {
            token = req.session.session_token;
        }
        res.render('settings', { title: 'GotReader -Settings-', session_token: token });
    });
};
