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
var FiberMini = require("../lib/FiberMini").FiberMini;
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
                    var jsonObject = JSON.parse(json);
                    callback(jsonObject);
                } catch (e) {
                    console.log(e);
                }
            });
        ;
    }).on('error', function (e) {
            console.log(e);
        });
}

describe('FeedParserFactory', function () {
    it('RSSのルートがrdf:RDFならをRDFParserを生成する', function () {
        var fiber = new FiberMini();
        fiber.run(function () {
            runs(function () {
                getXML("http://b.hatena.ne.jp/entrylist/it?sort=hot&threshold=&mode=rss", function (json) {
                    var parser = factory.createParser(json);
                    expect(parser).not.toEqual(null);
                    console.log("parser:" + parser.constructor.name);
                    expect(parser.constructor.name).toEqual("RDFParser");
                    fiber.notify();
                });
                fiber.wait();

            });
        })
    });

    it('RSSのルートがrssならをRSSParserを生成する', function () {
        var fiber = new FiberMini();
        fiber.run(function () {
            runs(function () {
                getXML("http://sankei.jp.msn.com/rss/news/west_flash.xml", function (json) {
                    var parser = factory.createParser(json);
                    expect(parser).not.toEqual(null);
                    console.log("parser:" + parser.constructor.name);
                    expect(parser.constructor.name).toEqual("RSSParser");
                    fiber.notify();
                });
                fiber.wait();
            });
        })
    });
});

describe("RDFParser", function () {
    var rdf = null;
    var fiber = new FiberMini();
    fiber.run(function () {
        runs(function () {
            getXML("http://b.hatena.ne.jp/entrylist/it?sort=hot&threshold=&mode=rss", function (json) {
                var parser = factory.createParser(json);
                expect(parser).not.toEqual(null);
                console.log("parser:" + parser.constructor.name);
                expect(parser.constructor.name).toEqual("RDFParser");
                rdf = json;
                fiber.notify();
            });
            fiber.wait();
        });
    });
    it("titleの取得が出来る", function(){
        expect(rdf).not.toEqual(null);
        var parser = factory.createParser(rdf);
        expect(parser.constructor.name).toEqual("RDFParser");

        var title = parser.getTitle();
        expect(title).not.toEqual(null);
    });
    it("itemの取得が出来る", function(){
        expect(rdf).not.toEqual(null);
        var parser = factory.createParser(rdf);
        expect(parser.constructor.name).toEqual("RDFParser");

        var items = parser.getItems();
        expect(items).not.toEqual(null);
    });
});
