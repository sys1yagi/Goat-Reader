/**
 * Created with JetBrains WebStorm.
 * User: yagitoshihiro
 * Date: 2013/03/22
 * Time: 15:01
 * To change this template use File | Settings | File Templates.
 */
var handler = require("./Handler");
var header = require("./RequestUtil");
var util = require("./RequestUtil");
var ItemModel = require("../../modules/model/ItemModel");
var UserModelDao = require("../../modules/model/UserModelDao");
var UserItemModelDao = require("../../modules/model/UserItemModelDao");
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
        return function (req, res) {
            UserModelDao.getUser(req, function (user) {
                //処理
                header.writeHeadJson(res);
                UserItemModelDao.getUnreadItems(user, 15, function(err, items){
                    if (err) {
                        res.write(util.makeResponseJsonBody("error", err));
                    }
                    else {
                        res.write(util.makeResponseJsonBody("success", items));
                    }
                    console.log("items:" + items.length);
                    res.end();
                });
                //ItemModelDao.getUnreadItems(user, 15)
                /*
                ItemModel.Item.find({mark: false}).sort({date: "desc"}).limit(15).exec(function (err, items) {

                });
                */
            });
        }
    };
    Module.prototype.path = function () {
        //パス
        return "/feeds";
    };

    return Module;
})(handler.handler);

exports.module = new Module();