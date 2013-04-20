//$CREATE_PATH
var handler = require("./Handler");
var util = require("../../modules/util/RequestExtensions");
var fs = require("fs");
var xml2json = require("xml2json");
var Fiber = require("fibers");

var FeedModel = require("../../modules/model/FeedModel");
var UserFeedModel = require("../../modules/model/UserFeedModel");
var UserFeedModelDao = require("../../modules/model/UserFeedModelDao");
var UserModelDao = require("../../modules/model/UserModelDao");

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

    /**
     *
     * すでにフィードが登録されているかどうかをDBに確認する
     * @param model
     * @returns {boolean}
     */
    function isExists(model, f) {
        FeedModel.Feed.findOne({ url: model.url }, function (err, feed) {
            if (feed === null) {
                f(false, feed);
            }
            else {
                f(true, feed);
            }
        });
    }

    /**
     * フィードを取り出して登録
     * @param items
     * @param callback
     */
    function addSubscriptions(args) {
        var user = args[0];
        var items = args[1];
        var callback = args[2];
        var item = null;
        if (items instanceof Array) {
            item = items.head();
        }
        else {
            item = items;
        }
        if (item === null) {
            //終了
            callback();
            return;
        }
        console.log("item:" + item);


        var fiber = Fiber.current;
        var model = new FeedModel.Feed();
        model.name = item.title;
        model.url = item.xmlUrl;
        //既に登録されている?
        isExists(model, function (is_exists, feed) {
            fiber.run([is_exists, feed]);
        });
        var result = Fiber.yield();
        var is_exists = result[0];
        var feed = result[1];

        if (!is_exists) {
            FeedModel.Feed.create(model, function (e, m) {
                console.log("create:" + model);
                fiber.run([e, m]);
            });
            result = Fiber.yield();
            var err = result[0];
            feed = result[1];
            //TODO error handling.
        }
        else {
            console.log("feed already exists:" + feed);
        }

        //UserFeedに追加
        UserFeedModelDao.addUserFeed(user, feed, function (err, model) {
            fiber.run([err, model]);
        });
        result = Fiber.yield();
        console.log("feed:" + result[1]);


        //next
        if (items instanceof Array) {
            addSubscriptions([user, items.tail(), callback]);
        }
        else {
            callback();
        }
    }

    /**
     * subscriptions.xmlのcategoryを取り出してまわす
     * @param categories
     * @param callback
     */
    function parseCategories(user, categories, callback) {
        var category = categories.head();
        if (category === null) {
            callback();
            return;
        }
        Fiber(addSubscriptions).run([user, category.outline, function () {
            parseCategories(
                user,
                categories.tail(),
                callback
            )
        }]);
    }

    Module.prototype.handle = function () {
        return function (req, res) {
            UserModelDao.getUser(req, function (user) {
                util.writeHeadJson(res);
                //check stat
                var stat = fs.statSync(req.files.file.path);
                var xml = fs.readFileSync(req.files.file.path, "utf-8");
                var json = xml2json.toJson(xml);
                var jsonObject = JSON.parse(json);
                if (typeof jsonObject.opml === "undefined") {
                    //ファイル無しとか
                    fs.unlinkSync(req.files.file.path);
                    res.write(util.makeResponseJsonBody("error", "file error."));
                    res.end();
                }
                else {
                    //パース
                    parseCategories(user, jsonObject.opml.body.outline, function () {
                        fs.unlinkSync(req.files.file.path);
                        res.write(util.makeResponseJsonBody("success", json));
                        res.end();
                    });
                }
            });
        }
    };
    Module.prototype.path = function () {
        return "/import_google_reader_subscriptions";
    };
    Module.prototype.method = function () {
        return "POST";
    }
    return Module;
})(handler.handler);
exports.module = new Module();

