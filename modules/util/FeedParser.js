/**
 * User: yagitoshihiro
 * Date: 2013/04/21
 * Time: 15:30
 * RSSパーザ
 */
var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var FeedParserFactory = (function () {
    function FeedParserFactory() { }
    FeedParserFactory.prototype.createParser = function (json) {
        return "";
    };
    return FeedParserFactory;
})();
exports.FeedParserFactory = new FeedParserFactory;

//RSS
//rss xmlns
//rdf:RDF

var FeedParser = (function () {
    function FeedParser(json) {
        this.json = json;
    }
    FeedParser.prototype.getTitle = function () {
        return "not yet implemented.";
    };
    FeedParser.prototype.getItems = function () {
    };
    return FeedParser;
})();
var RSSParser = (function (_super) {
    __extends(RSSParser, _super);
    function RSSParser(json) {
        _super.call(this, json);
    }
    RSSParser.prototype.getTitle = function () {
        return "not yet implemented.";
    };
    RSSParser.prototype.getItems = function () {
    };
    return RSSParser;
})(FeedParser);
var RDFParser = (function (_super) {
    __extends(RDFParser, _super);
    function RDFParser(json) {
        _super.call(this, json);
    }
    RDFParser.prototype.getTitle = function () {
        return "not yet implemented.";
    };
    RDFParser.prototype.getItems = function () {
    };
    return RDFParser;
})(FeedParser);
var AtomParser = (function (_super) {
    __extends(AtomParser, _super);
    function AtomParser(json) {
        _super.call(this, json);
    }
    AtomParser.prototype.getTitle = function () {
        return "not yet implemented.";
    };
    AtomParser.prototype.getItems = function () {
    };
    return AtomParser;
})(FeedParser);
