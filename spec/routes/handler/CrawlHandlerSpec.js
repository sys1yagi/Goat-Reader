var should = require("should");
require('../../../modules/util/JsExtensions');
var CrawlHandler = require("../../../routes/handler/CrawlHandler");

//data error
//http://www.oreilly.co.jp/ebook/new_release

describe("CrawlHandlerのloadFeedsをテスト", function(){
    it("http://himasoku.com/index.rdf", function(done){
        CrawlHandler.module.loadFeeds([{
            name:"暇人＼(＾o＾)／速報",
            url:"http://himasoku.com/index.rdf"
        }], function(){
            done();
        });
    });
    it("http://feed.rssad.jp/rss/techcrunch/feed", function(done){
        CrawlHandler.module.loadFeeds([{
            name:"techcrunch",
            url:"http://feed.rssad.jp/rss/techcrunch/feed"
        }], function(){
            done();
        });
    });
    it("302に対応", function(done){
        CrawlHandler.module.loadFeeds([{
            name:"カゼタカ2ブログch",
            url:"http://blog.livedoor.jp/kaibu222/index.rdf"
        }], function(){
            done();
        });
    });
});


describe("CrawlHandlerのテスト", function () {
    it("CrawlHandler", function (done) {
        console.log("start CrawlHandler");
        try {
            CrawlHandler.module.handle()(null,
                {
                    write: function (data) {
                    },
                    end: function () {
                        console.log("call end.");
                        done();
                    },
                    writeHead: function (status, header) {

                    }
                });

        } catch (e) {
            console.log(e);
            done();
        }
    });
});
