var handler = require("./handler");
var header = require("./HeaderUtil");

var parser = require('xml2json');
var http = require('http');
var Xml2Json = (function (_super) {
    handler.extends(Xml2Json, _super);
    function Xml2Json() {
        _super.apply(this, arguments);
    }

    Xml2Json.prototype.handle = function () {
        return function (req, res) {
            //header.writeHeadJson(res);
            header.writeHeadText(res);


            var dump = function (res, obj, prefix) {
                for (var i in obj) {
                    if (typeof(obj[i]) === "object") {
                        dump(res, obj[i], prefix + prefix);
                    }
                    else {
                        res.write(prefix + i + ":" + obj[i] + "\n");
                    }
                }
            }
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

                        res.write("size:"+items.length);
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