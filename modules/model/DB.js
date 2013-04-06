var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/goatreader');

exports.getDB = function(){
    //いずれtype指定できるようにする?
    return db;
}