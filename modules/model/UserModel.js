/**
 * Created with JetBrains WebStorm.
 * User: yagitoshihiro
 * Date: 2013/04/04
 * Time: 23:42
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose');
var DB = require("./DB");
var db = DB.getDB();
/**
 * ユーザ
 * @type {mongoose.Schema}
 */
var UserSchema = new mongoose.Schema({
    user_id:String
    ,twitter_token:String
    ,session_token:String
    ,session_date:Date
});
var User = db.model('user', UserSchema);
exports.User = User;
