var handler = require("./Handler");
var util = require("../../modules/util/RequestExtensions");
var parser = require('xml2json');
var http = require('http');
var url = require('url');
var Fiber = require("fibers");

var ItemModel = require("../../modules/model/ItemModel");
var UserItemModelDao = require("../../modules/model/UserItemModelDao");
var FeedModel = require("../../modules/model/FeedModel");
var UserFeedModelDao = require("../../modules/model/UserFeedModelDao");

var Module = (function (_super) {
    handler.extends(Module, _super);
    function Module() {
        _super.apply(this, arguments);
    }

    Module.prototype.startDate = null;
    function start() {
        this.startDate = new Date();
    }
    function end() {
        return +new Date() - this.startDate;
    }

    /**
     *
     * @param feed
     * @param item
     * @param callback
     */
    function insertUserItem(feed, item, callback){
        //feedからuser_feedを持ってくる
        UserFeedModelDao.getAllUserFeedFromFeedId(feed._id, function(err, user_feeds){
            if(err !== null || user_feeds === null){
                console.log("error:"+err);
                callback();
            }
            Fiber(function(){
                var fiber = Fiber.current;
                var size = user_feeds.length;
                for(var i = 0; i < size; i++){
                    var user_feed = user_feeds[i];
                    //もってきたuserのリストからuser_itemに追加する
                    UserItemModelDao.insertUserItem(user_feed.user_id, item, function(err, inserted){
                        if(err !== null){
                            console.log("err:"+err);
                        }
                        fiber.run(null);
                    });
                    Fiber.yield();
                }
                callback();
            }).run();
        });

        //console.log("insertUserItem");
        //callback();
    }

    /**
     * 取得したアイテムをdbに保存する
     * @param src_feed アイテムを取得したフィードのURL
     * @param items
     * @param callback 保存処理が終了した時に呼び出されるコールバック
     */
    function insertItems(src_feed, items, callback) {
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
                itemModel.source_feed = [src_feed.url];
                ItemModel.Item.create(itemModel, function (e, inserted) {
                    insertUserItem(src_feed, inserted, function(){
                        insertItems(src_feed, items.tail(), callback);
                    })
                });
            }
            else {
                //sourceに追加
                var size = i.source_feed.length;
                for (var count = 0; count < size; count++) {
                    if (i.source_feed[count] === src_feed.url) {
                        console.log("find!:" + item.link);

                        //TODO 既に存在するのでUserItemを更新しなくてもいいかも?
                        //パフォーマンスが問題になったら考える?
                        insertUserItem(src_feed, i, function(){
                            insertItems(src_feed, items.tail(), callback);
                        });
                        return;
                    }
                }
                console.log("duplicate!:" + item.link);
                i.source_feed.push(src_feed.url);
                i.save(function (err) {
                    console.log("update!");
                    //TODO ここも同じくUserItem側は触らなくてもいい気がする
                    insertUserItem(src_feed, i, function(){
                        insertItems(src_feed, items.tail(), callback);
                    });
                });
            }
        });
    }

    /**
     *
     * @param feeds
     * @param callback
     */
    function loadFeeds(feeds, callback) {
        var feed = feeds.head();
        if (feed === null) {
            callback();
            return;
        }
        console.log("-------------------------------")
        console.log("name:" + feed.name);
        console.log("url:" + feed.url);
        var uri = url.parse(feed.url);
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
                        insertItems(feed, items, function () {
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
                util.writeHeadHTML(res);
            }
            FeedModel.Feed.find(null, function (err, feeds) {
                loadFeeds(feeds, function () {
                    var ms = end();
                    console.log(ms + "ms");
                    if (res !== null) {
                        res.write(ms + "ms");
                        res.end();
                    }
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