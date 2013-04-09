/**
 * Created with JetBrains WebStorm.
 * User: yagitoshihiro
 * Date: 2013/04/09
 * Time: 23:58
 * To change this template use File | Settings | File Templates.
 */

var UserItemModel = require("./UserItemModel");

exports.getUnreadItemCount = function(user, callback){
    UserItemModel.UserItem.count({"user_id":user._id, "mark":false}, function(err, items){
        callback(err, items);
    });
}

/**
 *
 * @param user
 * @param count
 * @param callback
 */
exports.getUnreadItems = function(user, count, callback){

}