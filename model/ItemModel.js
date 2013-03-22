var mongoose = require('mongoose');
var DB = require("./DB");
var db = DB.getDB();

/**
 * RSSフィードのアイテム
 * @type {mongoose.Schema}
 */
var ItemSchema = new mongoose.Schema({
    name:String
    ,url:String
    , category:String
});

var Item = db.model('feed', ItemSchema);

exports.Item = Item;