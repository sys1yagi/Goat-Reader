/**
 * Created with JetBrains WebStorm.
 * User: yagitoshihiro
 * Date: 2013/03/22
 * Time: 15:19
 * To change this template use File | Settings | File Templates.
 */
var handler = require("./handler");
var header = require("./HeaderUtil");
var FeedModel = require("../../model/FeedModel");

/**
 * url = 追加するURL
 *
 */
var Module = (function (_super) {
    handler.extends(Module, _super);
    function Module() {
        _super.apply(this, arguments);
    }
    Module.prototype.handle = function () {
        return function(req,res){
            //処理
            header.writeHeadHTML(res);
            res.write("subscription");



            res.end();
        }
    };
    Module.prototype.path = function () {
        //パス
        return "/subscription";
    };

    return Module;
})(handler.handler);

exports.module = new Module();
