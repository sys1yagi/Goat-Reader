
exports.handlers=function(){
    var importRootPath="./routes/handler/"
    var handlers = new Array();
    var list=[
        "Xml2JsonHandler",
        "Feeds"
    ];
    for(var i = list.length-1; i >= 0; i--){
        handlers.push(importRootPath + list[i]);
    }
    return handlers;
}