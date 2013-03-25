var mongoose = require('mongoose');
var DB = require("./DB");
var db = DB.getDB();

/**
 * RSSフィードのアイテム
 * @type {mongoose.Schema}
 */
var ItemSchema = new mongoose.Schema({
    //item data
    title:String
    ,link:String
    ,description:String
    ,content:String
    ,date:Date
    ,subject:String

    //attribute
    ,source_feed:[String]
    ,category:[String]
    ,tags:[String]
    ,mark:Boolean
    ,start:Boolean

});
var Item = db.model('item', ItemSchema);
exports.Item = Item;