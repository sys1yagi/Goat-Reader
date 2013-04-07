//$CREATE_PATH
var handler = require("./handler");
var header = require("./RequestUtil");

var session = require("../../modules/util/Session");
var UserDao = require("../../modules/model/UserModelDao");
var Module = (function (_super) {
    handler.extends(Module, _super);
    function Module() {
        _super.apply(this, arguments);
    }
    Module.prototype.handle = function () {
        return function(req,res){
            header.writeHeadHTML(res);

            UserDao.getUser(req,function(user){
                res.end();
            });
            res.write("moge");
            res.write("session="+session.getSessionToken(req));
        }
    };
    Module.prototype.path = function () {
        return "/test";
    };
    return Module;
})(handler.handler);
exports.module = new Module();

