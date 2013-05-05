var should = require("should");
require('../../../modules/util/JsExtensions');
var CrawlHandler = require("../../../routes/handler/CrawlHandler");


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