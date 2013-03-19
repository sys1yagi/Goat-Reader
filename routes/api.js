var handler = require("./handler/handler");

//util methods
//TODO module化
function writeHead(res) {
    res.writeHead(200, {'Content-Type': 'text/json; charset=utf-8'});
}

///////////////////////////////////////////////
//TODO モジュール化

////////////////////////////////////////////////////////
//feeds
/**
 *
 * page_id: ページング
 * item_filter: 未読, 全て
 * category: カテゴリ
 * tags: タグ
 * word_filter: 絞り込み
 * sort: 新しい、古い
 *
 */
exports.feeds = function (req, res) {
    res.send("respond with a resource");
};

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




