var mongoose = require('mongoose');
var DB = require("./DB");
var db = DB.getDB();

/**
 * RSSフィードのURL
 * @type {mongoose.Schema}
 */
var FeedSchema = new mongoose.Schema({
    name:String
    ,url:String
    ,category:String
});
var Feed = db.model('feed', FeedSchema);
exports.Feed = Feed;