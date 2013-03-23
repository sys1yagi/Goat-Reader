/**
 * Created with JetBrains WebStorm.
 * User: yagitoshihiro
 * Date: 2013/03/23
 * Time: 22:58
 */
var handler = require("./handler");
var util = require("./RequestUtil");
var FeedModel = require("../../model/FeedModel");
var url = require('url');
/**
 * @param id 削除するFeedのID
 *
 */
var Module = (function (_super) {
    handler.extends(Module, _super);
    function Module() {
        _super.apply(this, arguments);
    }

    Module.prototype.handle = function () {
        return function (req, res) {
            //処理
            util.writeHeadJson(res);
            //FeedModel.Feed.find()
            var id = req.query['id'];
            if(typeof id === 'undefined'){
                res.write(util.makeResponseJsonBody("error", "id is undefined"));
                res.end();
                return;
            }
            FeedMdel.Feed.remove({"_id":id}, function(err){
                if(err){
                    res.write(util.makeResponseJsonBody("error", err));
                }
                else{
                    res.write(util.makeResponseJsonBody("success", id));
                }
                res.end();
            });
        }
    };
    Module.prototype.path = function () {
        return "/remove_subscription";
    };
    return Module;
})(handler.handler);

exports.module = new Module();
