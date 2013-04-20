/**
 * Created with JetBrains WebStorm.
 * User: yagitoshihiro
 * Date: 2013/03/26
 * Time: 16:02
 * To change this template use File | Settings | File Templates.
 */
var handler = require("./Handler");
var util = require("../../modules/util/RequestExtensions");
var UserItemModel = require("../../modules/model/UserItemModel");
var UserModelDao = require("../../modules/model/UserModelDao");
/**
 * 既読にする
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
                util.writeHeadJson(res);

                var ids = req.query.id.split(",");
                var query = new Array();
                var marked = true;
                if (req.query.mark === "false") {
                    marked = false;
                }
                console.log("marked:" + marked);
                for (var i = 0; i < ids.length; i++) {
                    query.push({"item_id": ids[i], "user_id":user._id});
                }
                console.log(query);
                UserItemModel.UserItem.update({$or: query}, {$set: {mark: marked}}, {multi: true}, function (err, numberAffected, raw) {
                    if (err) {
                        console.log(err);
                        res.write(util.makeResponseJsonBody("error", err));
                    }
                    else {
                        console.log('The number of updated documents was %d', numberAffected);
                        console.log('The raw response from Mongo was ', raw);
                        res.write(util.makeResponseJsonBody("success", raw));
                    }
                    res.end();
                });
            });
        }
    };
    Module.prototype.path = function () {
        //パス
        return "/marked";
    };

    return Module;
})(handler.handler);

exports.module = new Module();