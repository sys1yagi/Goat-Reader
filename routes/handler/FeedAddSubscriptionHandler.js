/**
 * Created with JetBrains WebStorm.
 * User: yagitoshihiro
 * Date: 2013/03/22
 * Time: 15:19
 * To change this template use File | Settings | File Templates.
 */
var handler = require("./Handler");
var util = require("../../modules/util/RequestExtensions");
var FeedModelDao = require("../../modules/model/FeedModelDao");
var UserFeedModelDao = require("../../modules/model/UserFeedModelDao");
var UserModelDao = require("../../modules/model/UserModelDao");
var url = require('url');

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
        return function (req, res) {
            UserModelDao.getUser(req, function (user) {
                //TODO userチェック
                //処理
                util.writeHeadHTML(res);
                var url_parts = url.parse(req.url, true);
                var query = url_parts.query;

                if (typeof query.url !== "undefined" && query.url.length > 0) {
                    FeedModelDao.addFeed(query.url, function(err, feed){
                        UserFeedModelDao.addUserFeed(user, feed, function(err2, user_feed){
                            if(err2 !== null){
                                res.write("ng" + user_feed);
                                res.end();
                            }
                            else{
                                res.write("ok" + user_feed);
                                res.end();
                            }
                        });
                    });
                }
                else {
                    res.write("url is undefined");
                    res.end();
                }
            });
        }
    };
    Module.prototype.path = function () {
        //パス
        return "/add_subscription";
    };
    return Module;
})(handler.handler);
exports.module = new Module();
