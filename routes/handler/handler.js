var RequestExtensions = require("../../modules/util/RequestExtensions");

var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Handler = (function () {
    function Handler() { }
    Handler.prototype.handle = function () {
        return function (req, res) {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.write("not yet implemented.");
            res.end();
        };
    };
    Handler.prototype.path = function () {
        return "/";
    };
    Handler.prototype.method = function(){
        return "GET";
    };
    return Handler;
})();

exports.handler = Handler;
exports.extends = __extends;