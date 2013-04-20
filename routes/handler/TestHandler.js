//$CREATE_PATH
var handler = require("./Handler");
var util = require("../../modules/util/RequestExtensions");
var settings = require("../../settings");

var UserDao = require("../../modules/model/UserModelDao");
var Module = (function (_super) {
    handler.extends(Module, _super);
    function Module() {
        _super.apply(this, arguments);
    }
    Module.prototype.handle = function () {
        return function(req,res){
            util.writeHeadHTML(res);

        }
    };
    Module.prototype.path = function () {
        return "/test";
    };
    return Module;
})(handler.handler);
exports.module = new Module();

