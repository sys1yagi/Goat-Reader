/**
 * Created with JetBrains WebStorm.
 * User: yagitoshihiro
 * Date: 2013/03/22
 * Time: 15:01
 * 未読件数を取得する
 */
var handler = require("./Handler");
var header = require("./RequestUtil");
var util = require("./RequestUtil");
var ItemModel = require("../../modules/model/ItemModel");
var UserItemModelDao = require("../../modules/model/UserItemModelDao");
var UserModelDao = require("../../modules/model/UserModelDao");


/**

 */
var Module = (function (_super) {
    handler.extends(Module, _super);
    function Module() {
        _super.apply(this, arguments);
    }
    Module.prototype.handle = function () {
        return function(req,res){
            UserModelDao.getUser(req, function(user){
                //処理
                header.writeHeadJson(res);
                UserItemModelDao.getUnreadItemCount(user, function(err, items){
                    if(err){
                        res.write(util.makeResponseJsonBody("error", err));
                    }
                    else{
                        res.write(util.makeResponseJsonBody("success", items));
                    }
                    res.end();
                });
                /*
                ItemModel.Item.count({mark:false}, function(err, items){
                    if(err){
                        res.write(util.makeResponseJsonBody("error", err));
                    }
                    else{
                        res.write(util.makeResponseJsonBody("success", items));
                    }
                    res.end();
                });
                */
            });
        }
    };
    Module.prototype.path = function () {
        //パス
        return "/all_unmark_count";
    };

    return Module;
})(handler.handler);

exports.module = new Module();