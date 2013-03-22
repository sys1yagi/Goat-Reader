var handler = require("./handler/handler");

//util methods
//TODO module化
function writeHead(res) {
    res.writeHead(200, {'Content-Type': 'text/json; charset=utf-8'});
}

///////////////////////////////////////////////
//TODO モジュール化
///////////////////////////////////////////////
//登録フィードを取得する
exports.feed_get_subscriptions = function (req, res) {
    res.send("respond with a resource");
};

//フィードを追加
exports.feed_add_subscribe = function (req, res) {

};
//フィードを削除
exports.feed_remove_subscribe = function (req, res) {
    res.send("respond with a resource");
};


//カテゴリの追加
//カテゴリの取得
//カテゴリの削除

//タグの追加
//タグの取得
//タグの削除




