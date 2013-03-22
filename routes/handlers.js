
var handlers = function(){
    var importRootPath="./handler/"
    var handlers = new Array();
    var list=[
        "Xml2JsonHandler",
        "FeedsHandler",
        "FeedSubscriptionHandler"
    ];
    for(var i = list.length-1; i >= 0; i--){
        handlers.push(importRootPath + list[i]);
    }
    return handlers;
}
exports.initilize = function(app){
    var handlers_list = handlers();
    for(var i in handlers_list){
        console.log(handlers_list[i]);
        var handler = require(handlers_list[i]);

        app.get(handler.module.path(), handler.module.handle());

    }
}