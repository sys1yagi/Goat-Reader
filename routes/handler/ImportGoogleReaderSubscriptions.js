//$CREATE_PATH
var handler = require("./handler");
var header = require("./RequestUtil");
var util = require("./RequestUtil");
var Module = (function (_super) {
    handler.extends(Module, _super);
    function Module() {
        _super.apply(this, arguments);
    }
    Module.prototype.handle = function () {
        return function(req,res){
            header.writeHeadJson(res);
            res.write(req.files.file.path); 

            res.end();
        }
    };
    Module.prototype.path = function () {
        return "/import_google_reader_subscriptions";
    };
    Module.prototype.method = function(){
        return "POST";
    }
    return Module;
})(handler.handler);
exports.module = new Module();

