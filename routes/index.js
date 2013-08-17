var UserModelDao = require("../modules/model/UserModelDao");
var MobileMatcher = require('../modules/util/MobileMatcher').instance;
exports.index = function (req, res) {
    UserModelDao.getUser(req, function (user) {
        var token = null;
        if (user.user_id !== "null") {
            token = req.session.session_token;
        }
        var ua = req.headers['user-agent'];
        if(MobileMatcher.isMobile(ua)){
            res.render('mobile/index', { title: 'GoatReader -Home-', session_token: token });
        }
        else{
            res.render('index', { title: 'GoatReader -Home-', session_token: token });
        }
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
