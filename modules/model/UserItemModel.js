/**
 * Created with JetBrains WebStorm.
 * User: yagitoshihiro
 * Date: 2013/04/05
 * Time: 23:13
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose');
var DB = require("./DB");
var db = DB.getDB();

/**
 * ユーザのRSSフィードのアイテム
 * @type {mongoose.Schema}
 */
var UserItemSchema = new mongoose.Schema({
    user_id:String
    ,item_id:String
    ,date:Date
    ,mark:Boolean
    ,fav:Boolean
    ,later:Boolean
    ,tags:[String]
});
var UserItem = db.model('user_item', UserItemSchema);
exports.UserItem = UserItem;