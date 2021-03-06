
var handlers = function(){
    var importRootPath="./handler/"
    var handlers = new Array();
    var list=[
        //アイテム一覧を取得する
        "FeedsHandler"

        //既読処理
        ,"UnreadCountHandler"

        //登録しているフィードを取得する
        ,"FeedSubscriptionHandler"

        //フィードを登録
        ,"FeedAddSubscriptionHandler"

        //フィードを削除
        ,"FeedRemoveSubscriptionHandler"

        //フィードを更新

        //Google Readerのsubscriptions.xmlをインポートする
        ,"ImportGoogleReaderSubscriptionsHandler"

        //既読処理
        ,"MarkHandler"

        //ふぁぼ
        ,"FavHandler"

        //カテゴリの追加
        //カテゴリの取得
        //カテゴリの削除

        //タグの追加
        //タグの取得
        //タグの削除

        //test用
        ,"TestHandler"
        ,"CrawlHandler"
    ];
    for(var i = list.length-1; i >= 0; i--){
        handlers.push(importRootPath + list[i]);
    }
    return handlers;
}
/**
 * ハンドラ登録をする処理
 * @param app
 */
exports.initilize = function(app){
    var handlers_list = handlers();
    var size = handlers_list.length;
    for(var i = 0; i < size; i++){
        console.log(handlers_list[i]);
        var handler = require(handlers_list[i]);
        if(handler.module.method() === "GET"){
            app.get(handler.module.path(), handler.module.handle());
        }
        else{
            app.post(handler.module.path(), handler.module.handle());
        }
    }
}