var mongoose = require('mongoose');
//var db = mongoose.connect('mongodb://localhost/goatreader');
var DB = require("./DB");
var db = DB.getDB();

var FeedSchema = new mongoose.Schema({
    todo:{type:String}
    , addDate:{type:Date}
    , tags:[String]
    , status:{type:Boolean}
    , order:{type:Number}
    , parent:{type:String}
    , category:String
});

var Feed = db.model('todo', FeedSchema);

exports.Feed = Feed;