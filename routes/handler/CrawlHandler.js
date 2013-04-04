var handler = require("./handler");
var header = require("./RequestUtil");
var parser = require('xml2json');
var http = require('http');
var url = require('url');
var ItemModel = require("../../model/ItemModel");
var FeedModel = require("../../model/FeedModel");


Array.prototype.head = function () {
    if (this.length == 0) {
        return null;
    }
    return this[0];
}
Array.prototype.tail = function () {
    if (this.length == 0) {
        return null;
    }
    var tail = new Array();
    var length = this.length;
    for (var i = 1; i < length; i++) {
        tail.push(this[i]);
    }
    return tail;
}

var Module = (function (_super) {
    handler.extends(Module, _super);
    function Module() {
        _super.apply(this, arguments);
    }

    startDate = null;
    function start() {
        startDate = new Date();
    }

    function end() {
        return new Date().getTime() - this.startDate.getTime();
    }

    /**
     * 取得したアイテムをdbに保存する
     * @param src アイテムを取得したフィードのURL
     * @param items
     * @param callback 保存処理が終了した時に呼び出されるコールバック
     */
    function insertItems(src, items, callback) {
        var item = items.head();
        if (item === null) {
            callback();
            return;
        }
        ItemModel.Item.findOne({link: item.link}, function (err, i) {
            if (err || i === null) {
                console.log("not found:" + item.link);
                //新規作成
                var itemModel = new ItemModel.Item();
                itemModel.title = item.title;
                itemModel.link = item.link;
                itemModel.description = item.description;
                itemModel.content = item["content:encoded"];
                itemModel.date = new Date(item["dc:date"]);
                itemModel.subject = item["dc:subject"];
                itemModel.source_feed = [src];
                itemModel.mark = false;
                ItemModel.Item.create(itemModel, function (e, inserted) {
                    insertItems(src, items.tail(), callback);
                });
            }
            else {
                //sourceに追加
                var size = i.source_feed.length;
                for (var count = 0; count < size; count++) {
                    if (i.source_feed[count] === src) {
                        console.log("find!:" + item.link);
                        insertItems(src, items.tail(), callback);
                        return;
                    }
                }
                console.log("duplicate!:" + item.link);
                i.source_feed.push(src);
                i.save(function (err) {
                    console.log("update!");
                    insertItems(src, items.tail(), callback);
                });
            }
        });
    }

    function loadFeeds(feeds, callback) {
        var src = feeds.head();
        if (src === null) {
            callback();
            return;
        }
        console.log("-------------------------------")
        console.log("name:"+src.name);
        console.log("url:"+src.url);
        src = src.url;
        var uri = url.parse(src);
        http.get({
            host: uri.hostname,
            port: 80,
            path: uri.path
        },function (resp) {
            var rss = "";
            resp
                .on("data", function (chunk) {
                    rss += chunk;
                })
                .on("end", function () {
                    try {
                        var json = parser.toJson(rss);
                        var jsonObject = JSON.parse(json);
                        var items = jsonObject["rdf:RDF"]["item"];
                        insertItems(src, items, function () {
                            loadFeeds(feeds.tail(), callback);
                        });
                    } catch (e) {
                        console.log(e);
                        loadFeeds(feeds.tail(), callback);
                    }
                });
            ;
        }).on('error', function (e) {
                console.log(e);
                loadFeeds(feeds.tail(), callback);
            });
    }

    Module.prototype.handle = function () {
        return function (req, res) {
            start();
            if (res !== null) {
                header.writeHeadHTML(res);
            }
            FeedModel.Feed.find(null, function (err, feeds) {
                loadFeeds(feeds, function () {
                    var ms = end();
                    if (res !== null) {
                        res.write(ms + "ms");
                        res.end();
                    }
                    console.log(ms + "ms");
                });
            });
        };
    };
    Module.prototype.path = function () {
        return "/crawl";
    };

    return Module;
})(handler.handler);
exports.module = new Module();