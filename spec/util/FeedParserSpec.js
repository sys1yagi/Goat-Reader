var should = require("should");
var FeedParser = require('../../modules/util/FeedParser');
var factory = FeedParser.FeedParserFactory;
var ajaxCache = require("../lib/AjaxCache");

describe('FeedParserFactory', function () {
    it('RSSのルートがrdf:RDFならをRDFParserを生成する', function (done) {
        ajaxCache.getXML("http://b.hatena.ne.jp/entrylist/it?sort=hot&threshold=&mode=rss", function (json) {
            var parser = factory.createParser(json);
            should.exist(parser);
            parser.constructor.name.should.equal("RDFParser");
            done();
        });
    });
    it('RSSのルートがrssならをRSSParserを生成する', function (done) {
        ajaxCache.getXML("http://sankei.jp.msn.com/rss/news/west_flash.xml", function (json) {
            var parser = factory.createParser(json);
            should.exist(parser);
            parser.constructor.name.should.equal("RSSParser");
            done();
        });
    });
});


describe("RDFParser", function () {
    var rdf = null;
    beforeEach(function (done) {
        if (rdf === null) {
            ajaxCache.getXML("http://b.hatena.ne.jp/entrylist/it?sort=hot&threshold=&mode=rss", function (json) {
                var parser = factory.createParser(json);
                should.exist(parser);
                console.log("parser:" + parser.constructor.name);
                parser.constructor.name.should.equal("RDFParser");
                rdf = json;
                done();
            });

        }
        else {
            console.log("exist");
            done();
        }
    });
    it("titleの取得が出来る", function () {
        should.exist(rdf);
        var parser = factory.createParser(rdf);
        should.exist(parser);
        parser.constructor.name.should.equal("RDFParser");
        var title = parser.getTitle();
        should.exist(title);
    });
    it("itemの取得が出来る", function () {
        should.exist(rdf);
        var parser = factory.createParser(rdf);
        should.exist(parser);
        parser.constructor.name.should.equal("RDFParser");
        var items = parser.getItems();
        should.exist(items);
    });
});