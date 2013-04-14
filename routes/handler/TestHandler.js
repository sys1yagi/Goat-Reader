//$CREATE_PATH
var handler = require("./Handler");
var header = require("./RequestUtil");
var settings = require("../../settings");

var session = require("../../modules/util/RequestExtensions");
var UserDao = require("../../modules/model/UserModelDao");
var Module = (function (_super) {
    handler.extends(Module, _super);
    function Module() {
        _super.apply(this, arguments);
    }
    Module.prototype.handle = function () {
        return function(req,res){
            header.writeHeadHTML(res);

        }
    };
    Module.prototype.path = function () {
        return "/test";
    };
    return Module;
})(handler.handler);
exports.module = new Module();

