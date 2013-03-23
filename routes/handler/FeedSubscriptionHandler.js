/**
 * Created with JetBrains WebStorm.
 * User: yagitoshihiro
 * Date: 2013/03/22
 * Time: 15:01
 * 登録済みのFeed URLを取得する
 */
var handler = require("./handler");
var header = require("./HeaderUtil");
var FeedModel = require("../../model/FeedModel");
var Module = (function (_super) {
    handler.extends(Module, _super);
    function Module() {
        _super.apply(this, arguments);
    }
    /**
     * JSON形式のデータを生成する
     * @param status
     * @param body
     * @return {*}
     */
    function makeResponseBody(status, body){
        return JSON.stringify({status:status, body:body});
    }
    Module.prototype.handle = function () {
        return function(req,res){
            //処理
            header.writeHeadJson(res);
            FeedModel.Feed.find().exec(function (err, feeds) {
                console.log("load_todo_list loaded!");
                if(err){
                    res.write(makeResponseBody("error", "load error!"+err));
                }
                else{
                    res.write(makeResponseBody("success", feeds));
                }
                res.end();
            });
        }
    };
    Module.prototype.path = function () {
        //パス
        return "/subscription";
    };

    return Module;
})(handler.handler);

exports.module = new Module();
