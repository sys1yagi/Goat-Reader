/**
 * Created with JetBrains WebStorm.
 * User: yagitoshihiro
 * Date: 2013/03/22
 * Time: 15:01
 * To change this template use File | Settings | File Templates.
 */
var handler = require("./handler");
var header = require("./RequestUtil");

/**
 * page_id: ページング
 * item_filter: 未読, 全て
 * category: カテゴリ
 * tags: タグ
 * word_filter: 絞り込み
 * sort: 新しい、古い
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