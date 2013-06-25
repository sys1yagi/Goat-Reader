/**
 * Created with JetBrains WebStorm.
 * User: yagitoshihiro
 * Date: 2013/04/07
 * Time: 0:50
 * To change this template use File | Settings | File Templates.
 */

var session = require("../util/RequestExtensions");
var UserModel = require("./UserModel");
var Item = require("./ItemModel");
var Fiber = require("fibers");

/**
 * 匿名ユーザを取得する
 * @param callback
 */
function getAnonymouseUser(callback) {
    var fiber = Fiber.current;
    UserModel.User.findOne({"user_id": "null"}, function (err, user) {
        fiber.run([err, user]);
    });
    var result = Fiber.yield();
    var err = result[0];
    var user = result[1];
    if (user === null || user === "") {
        //create
        console.log("anonymouse null");
        var user = new UserModel.User();
        user.user_id = "null";
        user.session_token = "null";
        user.session_date = null;
        UserModel.User.create(user, function (err, user) {
            fiber.run([err, user]);
        });
        var create = Fiber.yield();
        err = create[0];
        user = create[1];
        callback(user);
    }
    else {
        callback(user);
    }
}

/**
 * セッション情報からUser情報を返す
 * @param req
 */
exports.getUser = function (req, callback) {
    var session_obj = session.getSession(req);
    var session_token = session.getSessionToken(req);
    if (typeof(session_token) === "undefined") {
        //anonymouse
        console.log("anonymouse mode");
        Fiber(getAnonymouseUser).run(callback);
    }
    else {
        UserModel.User.findOne({"session_token": session_token}, function (err, user) {
            if (user !== null) {
                callback(user);
            }
            else {
                Fiber(getAnonymouseUser).run(callback);
            }
        });
    }
}

exports.startSession = function (req, callback) {
    var session_obj = session.getSession(req);
    var session_token = session.getSessionToken(req);

    UserModel.User.findOne({"user_id": session_obj.passport.user.username}, function (err, user) {
        if (user !== null) {
            console.log("exsits user.:"+session_token);
            user.session_token = session_token;
            user.session_date = Date.now();
            user.save(function (err) {
                callback(user);
            });
        }
        else {
            console.log("create user.");
            var user = new UserModel.User();
            user.user_id = session_obj.passport.user.username;
            user.session_token = session_token;
            user.session_date = Date.now();
            UserModel.User.create(user, function (err, user) {
                callback(user);
            });
        }
    });
}
