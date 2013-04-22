/**
 * Created with JetBrains WebStorm.
 * User: yagitoshihiro
 * Date: 2013/04/21
 * Time: 16:21
 * To change this template use File | Settings | File Templates.
 */
var FeedParser = require('../../modules/util/FeedParser');
var factory = FeedParser.FeedParserFactory;
var xml2json = require('xml2json');
var http = require('http');
var url = require('url');
var Fiber = require("fibers");

function getXML(url_string, callback) {
    var uri = url.parse(url_string);
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
                    var json = xml2json.toJson(rss);
                    //var jsonObject = JSON.parse(json);
                    //var items = jsonObject["rdf:RDF"]["item"];

                    callback(json);
                } catch (e) {
                    console.log(e);
                }
            });
        ;
    }).on('error', function (e) {
            console.log(e);
        });
}

var FiberMini = function () {
    var self = {
        isEnd: false,
        dict: {},
        run: function (f) {
            f();
        },
        wait: function (timeout) {
            if(typeof timeout === "undefined"){
                timeout = 100000000;
            }
            waitsFor(function () {
                if (self.isEnd) {
                    self.isEnd = false;
                    return true;
                }
                return self.isEnd;
            }, "timeout", timeout);
        },
        notify: function () {
            self.isEnd = true;
        },
        put: function (key, value) {
            self.dict[key] = value;
        },
        get: function (key) {
            return self.dict[key];
        }
    };
    return self;
}
describe("async test", function () {
    var fiber = new FiberMini();
    fiber.run(function () {
        console.log("1");
        runs(function () {
            console.log("4");
            getXML("http://b.hatena.ne.jp/entrylist/it?sort=hot&threshold=&mode=rss", function (xml) {
                console.log("6");
                fiber.put("xml", xml);
                fiber.notify();
            });
            fiber.wait();
            console.log("5");
        });
        console.log("2");
        runs(function () {
            console.log("7");
            var xml = fiber.get("xml");
            expect(xml).not.toEqual(null);
            console.log("8");
        });
        console.log("3");
    });
});

describe('FeedParserFactory', function () {
    var fetchDone = false;
    it('FeedParserFactoryでRSSParserを生成', function () {

        /*
         console.log("1");
         Fiber(function(){
         var fiber = Fiber.current;
         console.log("2");
         getXML("http://b.hatena.ne.jp/entrylist/it?sort=hot&threshold=&mode=rss", function(json){
         fiber.run(json);
         });
         var result = Fiber.yield();
         console.log("3");
         }).run();
         console.log("4");
         ///getXML("http://b.hatena.ne.jp/entrylist/it?sort=hot&threshold=&mode=rss", function(json){
         //});
         var parser = factory.createParser("");
         //expect(array.head()).toEqual(1);
         */
    });
});

