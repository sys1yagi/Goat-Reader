/**
 * Created with JetBrains WebStorm.
 * User: yagitoshihiro
 * Date: 2013/03/22
 * Time: 15:19
 * To change this template use File | Settings | File Templates.
 */
var handler = require("./handler");
var util = require("./RequestUtil");
var FeedModel = require("../../modules/model/FeedModel");
var url = require('url');
var http = require("http");
var parser = require('xml2json');
/**
 * url = 追加するURL
 *
 */
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
                f(false);
            }
            else {
                f(true);
            }
        });
    }
    /**
     * フィードの名称を取得する
     * @param model
     */
    function getFeedTitle(model, f) {
        var uri = url.parse(model.url);
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
                    var json = parser.toJson(rss);
                    var jsonObject = JSON.parse(json);
                    var title = jsonObject["rdf:RDF"]["channel"]["title"];
                    f(title);
                });
            ;
        }).on('error', function (e) {
                f(null);
                console.log(e);
            });
    }

    Module.prototype.handle = function () {
        return function (req, res) {
            //処理
            util.writeHeadHTML(res);
            var url_parts = url.parse(req.url, true);
            var query = url_parts.query;
            var model = new FeedModel.Feed();
            if (typeof query.url !== "undefined" && query.url.length > 0) {
                model.name = "noname";
                model.url = query.url;
                //url重複あるかチェック
                isExists(model, function (e) {
                    if (!e) {
                        //なければ追加
                        res.write("ok:" + model);
                        getFeedTitle(model, function (name) {
                            if(name != null){
                                model.name = name;
                            }
                            FeedModel.Feed.create(model, function(e, m){
                                //res.write(m);
                                res.write("ok" + m);
                                res.end();
                            });
                        });
                    }
                    else {
                        res.write("already exists:" + model.url);
                        res.end();
                    }
                });
            }
            else {
                res.write("url is undefined");
                res.end();
            }
        }
    };
    Module.prototype.path = function () {
        //パス
        return "/add_subscription";
    };
    return Module;
})(handler.handler);
exports.module = new Module();
