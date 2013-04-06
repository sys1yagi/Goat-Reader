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
    ,item_id:String
    ,mark:Boolean
    ,fav:Boolean
    ,later:Boolean
    ,tags:[String]
});
var User = db.model('user_item', UserSchema);
exports.UserItem = User;


/**
 * セッション情報からUser情報を返す
 * @param req
 */
exports.getUser = function(req){

}