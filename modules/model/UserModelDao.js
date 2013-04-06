/**
 * Created with JetBrains WebStorm.
 * User: yagitoshihiro
 * Date: 2013/04/07
 * Time: 0:50
 * To change this template use File | Settings | File Templates.
 */

var sync = require('synchronize');

var session = require("../util/Session");
var UserModel = require("./UserModel");
var Item = require("./ItemModel");
var Fiber = require("fibers");

/**
 * 匿名ユーザを取得する
 * @param callback
 */
function getAnonymouseUser(callback){
    var fiber = Fiber.current;
    UserModel.User.findOne({"user_id":"null"}, function(err, user){
        fiber.run([err, user]);
    });
    var result = Fiber.yield();
    var err = result[0];
    var user = result[1];
    if(user === null || user === ""){
        //create
        console.log("anonymouse null");
        var user = new UserModel.User();
        user.user_id="null";
        UserModel.User.create(user, function(err, user){
           fiber.run([err, user]);
        });
        var create = Fiber.yield();
        err = create[0];
        user = create[1];
        callback(user);
    }
    else{
        callback(user);
    }
}

/**
 * セッション情報からUser情報を返す
 * @param req
 */
exports.getUser = function (req,callback) {
    if (typeof(session.getSessionToken(req)) === "undefined") {
        //anonymouse
        console.log("anonymouse mode");
        Fiber(getAnonymouseUser).run(callback);
    }
    else {
        //TODO
        //user data
        callback(null);
    }
}