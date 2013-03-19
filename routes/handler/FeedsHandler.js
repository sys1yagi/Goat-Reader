var handler = require("./handler");
var header = require("./HeaderUtil");

var Module = (function (_super) {
    handler.extends(Module, _super);
    function Module() {
        _super.apply(this, arguments);
    }
    Module.prototype.handle = function () {
        return function(req,res){
            //処理
            header.writeHeadHTML(res);
            res.write("feeds");
            res.end();
        }
    };
    Module.prototype.path = function () {
        //パス

        return "/feeds";
    };

    return Module;
})(handler.handler);

exports.module = new Module();