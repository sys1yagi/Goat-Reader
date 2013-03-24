var handler = require("./handler");
var header = require("./RequestUtil");

var parser = require('xml2json');
var http = require('http');

var ItemModel = require("../../model/ItemModel");

var Xml2Json = (function (_super) {
    handler.extends(Xml2Json, _super);
    function Xml2Json() {
        _super.apply(this, arguments);
    }

    Xml2Json.prototype.handle = function () {
        return function (req, res) {
            //util.writeHeadJson(res);
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
                            res.write("content:encoded:"+ item["content:encoded"] + "<br/>");
                            res.write("dc:date:"+ item["dc:date"] + "<br/>");
                            res.write("dc:subject:"+ item["dc:subject"] + "<br/>");
                            res.write("<hr/>");

                            var itemModel = new ItemModel.Item();
                            itemModel.title = item.title;
                            itemModel.link = item.link;


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
})
    (handler.handler);
exports.module = new Xml2Json();