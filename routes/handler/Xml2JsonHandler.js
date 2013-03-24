var handler = require("./handler");
var header = require("./RequestUtil");
var parser = require('xml2json');
var http = require('http');
var ItemModel = require("../../model/ItemModel");

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

var Xml2Json = (function (_super) {
    handler.extends(Xml2Json, _super);
    function Xml2Json() {
        _super.apply(this, arguments);
    }

    function insertItems(items, callback) {
        var item = items.head();
        if(item === null){
            callback();
            return;
        }
        ItemModel.Item.findOne({link: item.link}, function (err, i) {
            if (err || i === null) {
                console.log("not found:" + item.link);
                //新規作成
            }
            else{
                console.log("find!:"+item.link);
                //sourceに追加
            }
            insertItems(items.tail(), callback);
        });

//        var itemModel = new ItemModel.Item();
//        itemModel.title = item.title;
//        itemModel.link = item.link;
//        itemModel.description = item.description;
//                                title:String
//                                ,link:String
//                                ,description:String
//                                ,content:String
//                                ,date:Date
//                                ,subject:String
//
//                                //attribute
//                                ,source_feed:String
//                                ,category:String
//                                ,tags:String
    }

    Xml2Json.prototype.handle = function () {
        return function (req, res) {
            header.writeHeadHTML(res);

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
                        var jsonObject = JSON.parse(json);
                        var items = jsonObject["rdf:RDF"]["item"];
                        var itemSize = items.length;
                        var itemModels = new Array();
                        for (var i = 0; i < itemSize; i++) {
                            var item = items[i];
                            res.write("title:" + item.title + "<br/>");
                            res.write("link:" + item.link + "<br/>");
                            res.write("description:" + item.description + "<br/>");
                            res.write("content:encoded:" + item["content:encoded"] + "<br/>");
                            res.write("dc:date:" + item["dc:date"] + "<br/>");
                            res.write("dc:subject:" + item["dc:subject"] + "<br/>");
                            res.write("<hr/>");
                        }
                        insertItems(items, function () {
                            console.log("moge");
                            res.end();
                        });
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
})
    (handler.handler);
exports.module = new Xml2Json();