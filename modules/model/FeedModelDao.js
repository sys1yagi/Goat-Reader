var FeedModel = require("./FeedModel");
var UserModel = require("./UserModel");
var http = require("http");
var parser = require('xml2json');
var url = require('url');
/**
 * すでにフィードが登録されているかどうかをDBに確認する
 * @param model
 * @returns {boolean}
 */
function isExists(model, callback) {
    FeedModel.Feed.findOne({ url: model.url }, function (err, feed) {
        callback(err, feed);
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
                try{
                    var json = parser.toJson(rss);
                    var jsonObject = JSON.parse(json);
                    var title = jsonObject["rdf:RDF"]["channel"]["title"];
                    f(title);
                }catch(e){
                    console.log("err:"+e);
                    f(null);
                }
            });
        ;
    }).on('error', function (e) {
            f(null);
            console.log(e);
        });
}
/**
 * フィードを追加する
 * @param url
 * @param callback
 */
exports.addFeed = function (url, callback) {
    var model = new FeedModel.Feed();
    model.name = 'noname';
    model.url = url;
    //url重複あるかチェック
    isExists(model, function (err, feed) {
        if (!feed) {
            //なければ追加
            getFeedTitle(model, function (name) {
                if (name != null) {
                    model.name = name;
                }
                FeedModel.Feed.create(model, function (e, m) {
                    callback(e, m);
                });
            });
        }
        else {
            callback(err, feed);
        }
    });
}