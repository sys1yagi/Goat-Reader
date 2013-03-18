var handler = require("./handler");

//util methods
//TODO module化
function writeHead(res) {
    res.writeHead(200, {'Content-Type': 'text/json; charset=utf-8'});
}

///////////////////////////////////////////////
//TODO モジュール化
var parser = require('xml2json');
var http = require('http');
var Xml2Json = (function (_super) {
    handler.extends(Xml2Json, _super);
    function Xml2Json() {
        _super.apply(this, arguments);
    }
    Xml2Json.prototype.handle = function () {
        return function (req, res) {
            writeHead(res);
            http.get({
                host: "b.hatena.ne.jp",
                port: 80,
                path: "/entrylist/it?sort=hot&threshold=&mode=rss"
            },function (resp) {
                var rss = "";
                resp
                    .on("data", function (chunk) {
                        rss += chunk;
                    })
                    .on("end", function () {
                        var json = parser.toJson(rss);
                        res.write(json);
                        res.end();
                    });
                ;
            }).on('error', function (e) {
                    console.log(e);
                });
        };
    };
    Xml2Json.prototype.path = function () {
        return "/x2j";
    };

    return Xml2Json;
})(handler.handler);
exports.xml2json = new Xml2Json();
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




