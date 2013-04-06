//$CREATE_PATH
var handler = require("./handler");
var header = require("./RequestUtil");
var util = require("./RequestUtil");

var session = require("../../modules/util/Session");
var User = require("../../modules/model/UserModel");
var Module = (function (_super) {
    handler.extends(Module, _super);
    function Module() {
        _super.apply(this, arguments);
    }
    Module.prototype.handle = function () {
        return function(req,res){
            //TODO not yet implements
            header.writeHeadHTML(res);
            res.write("moge");

            res.write("session="+session.getSessionToken(req));

            res.end();
        }
    };
    Module.prototype.path = function () {
        //TODO set path
        return "/test";
    };
    return Module;
})(handler.handler);
exports.module = new Module();

