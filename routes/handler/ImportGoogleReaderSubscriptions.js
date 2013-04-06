//$CREATE_PATH
var handler = require("./handler");
var header = require("./RequestUtil");
var util = require("./RequestUtil");
var fs = require("fs");
var xml2json = require("xml2json");
var FeedModel = require("../../modules/model/FeedModel");

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

    function addSubscriptions(items, f){
        var item = null;
        if(items instanceof Array){
            item = items.head();
        }
        else{
            item = items;
        }
        if(item === null){
            f();
            return;
        }
        console.log(item);

        var model = new FeedModel.Feed();
        model.name = item.title;
        model.url = item.xmlUrl;
        isExists(model, function(is_exists, feed){
            if(!is_exists){
                FeedModel.Feed.create(model, function(e, m){
                    console.log("create:"+model);
                    if(items instanceof Array){
                        addSubscriptions(items.tail(), f);
                    }
                    else{
                        f();
                    }
                });
            }
            else{
                console.log("already exists! " + feed);
                //ユーザがあるか

                if(items instanceof Array){
                    addSubscriptions(items.tail(), f);
                }
                else{
                    f();
                }
            }
        });
    }

    function forCategory(categories, callback){
        var category = categories.head();
        if(category === null){
            callback();
            return;
        }
        addSubscriptions(category.outline, function(){
            forCategory(
                categories.tail(),
                callback
            )
        });
    }

    Module.prototype.handle = function () {
        return function(req,res){
            header.writeHeadJson(res);
            //check stat
            var stat = fs.statSync(req.files.file.path);
            var xml = fs.readFileSync(req.files.file.path, "utf-8");
            var json = xml2json.toJson(xml);
            var jsonObject = JSON.parse(json);
            if(typeof jsonObject.opml === "undefined"){
                fs.unlinkSync(req.files.file.path);
                res.write(util.makeResponseJsonBody("error", "file error."));
                res.end();
            }
            else{
                forCategory(jsonObject.opml.body.outline, function(){
                    fs.unlinkSync(req.files.file.path);
                    res.write(util.makeResponseJsonBody("success", json));
                    res.end();
                });
            }
        }
    };
    Module.prototype.path = function () {
        return "/import_google_reader_subscriptions";
    };
    Module.prototype.method = function(){
        return "POST";
    }
    return Module;
})(handler.handler);
exports.module = new Module();

