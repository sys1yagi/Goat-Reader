//$CREATE_PATH
var handler = require("./Handler");
var util = require("../../modules/util/RequestExtensions");
var settings = require("../../settings");
var http = require('http');
var url = require('url');
var parser = require('xml2json');
var UserDao = require("../../modules/model/UserModelDao");
var Module = (function (_super) {
    handler.extends(Module, _super);
    function Module() {
        _super.apply(this, arguments);
    }
    Module.prototype.handle = function () {
        return function(req,res){
            util.writeHeadHTML(res);
            var uri = url.parse("http://b.hatena.ne.jp/entrylist/it?sort=hot&threshold=&mode=rss");
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
                            //var items = jsonObject["rdf:RDF"]["item"];
                            res.write(json);
                            res.end();
                        } catch (e) {
                            console.log(e);
                        }
                    });
                ;
            }).on('error', function (e) {
                    console.log(e);
                });
        }
    };
    Module.prototype.path = function () {
        return "/test";
    };
    return Module;
})(handler.handler);
exports.module = new Module();

