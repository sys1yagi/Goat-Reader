//$CREATE_PATH
var handler = require("./Handler");
var util = require("./RequestUtil");
var Module = (function (_super) {
    handler.extends(Module, _super);
    function Module() {
        _super.apply(this, arguments);
    }
    Module.prototype.handle = function () {
        return function(req,res){
            util.writeHeadJson(res);

            res.end();
        }
    };
    Module.prototype.path = function () {
        return "/fav_item";
    };
    return Module;
})(handler.handler);
exports.module = new Module();

