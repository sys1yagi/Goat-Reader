var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/goatreader');

var FeedSchema = new mongoose.Schema({
    todo:{type:String}
    , addDate:{type:Date}
    , tags:[String]
    , status:{type:Boolean}
    , order:{type:Number}
    , parent:{type:String}
    , category:String
});

var Todo = db.model('todo', TodoSchema);

exports.Todo = Todo;

exports.createModel = function (todo, addDate, tags, status, order, parent, category) {
    return {
        "todo":todo,
        "addDate":addDate,
        "tags":tags,
        "status":status,
        "order":order,
        "parent":parent,
        "category":category
    };
}