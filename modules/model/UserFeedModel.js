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
 * RSSフィードのURL
 * @type {mongoose.Schema}
 */
var UserFeedSchema = new mongoose.Schema({
    user_id:String
    ,feed_id:String
    ,category_id:String
});
var UserFeed = db.model('user_feed', UserFeedSchema);
exports.UserFeed = UserFeed;