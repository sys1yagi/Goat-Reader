
var handlers = function(){
    var importRootPath="./handler/"
    var handlers = new Array();
    var list=[
        //いずれ消す
        "Xml2JsonHandler",

        //アイテム一覧を取得する
        "FeedsHandler",

        //登録しているフィードを取得する
        "FeedSubscriptionHandler",

        //フィードを登録
        "FeedAddSubscriptionHandler",

        //フィードを削除
        "FeedRemoveSubscriptionHandler"

        //フィードを更新


        //カテゴリの追加
        //カテゴリの取得
        //カテゴリの削除

        //タグの追加
        //タグの取得
        //タグの削除
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