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
        var root = null;
        for(var key in json) {
            console.log( key ); //will give "services"
            root = key;
        }
        console.log("root:"+root);
        switch(root){
            case "rdf:RDF":
                return new RDFParser(json);
            case "rss":
                return new RSSParser(json);
        }
        return null;
    };
    return FeedParserFactory;
})();
exports.FeedParserFactory = new FeedParserFactory;


//base class
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

//rss xmlns
var RSSParser = (function (_super) {
    __extends(RSSParser, _super);
    function RSSParser(json) {
        _super.call(this, json);
    }
    RSSParser.prototype.getTitle = function () {
        return "not yet implemented.";
    };
    RSSParser.prototype.getItems = function () {
        return null;
    };
    return RSSParser;
})(FeedParser);

//rdf:RDF
var RDFParser = (function (_super) {
    __extends(RDFParser, _super);
    function RDFParser(json) {
        _super.call(this, json);
    }
    RDFParser.prototype.getTitle = function () {
        if(this.json === null){
            return null;
        }
        return this.json["rdf:RDF"]["channel"]["title"];
    };
    RDFParser.prototype.getItems = function () {
        if(this.json === null){
            return null;
        }
        return this.json["rdf:RDF"]["item"];
    };
    return RDFParser;
})(FeedParser);

//
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
