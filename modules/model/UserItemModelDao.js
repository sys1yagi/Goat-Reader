/**
 * Created with JetBrains WebStorm.
 * User: yagitoshihiro
 * Date: 2013/04/09
 * Time: 23:58
 * To change this template use File | Settings | File Templates.
 */
var Fiber = require("fibers");
var UserItemModel = require("./UserItemModel");
var ItemModel = require("./ItemModel");

exports.getUnreadItemCount = function (user, callback) {
    UserItemModel.UserItem.count({"user_id": user._id, "mark": false}, function (err, items) {
        callback(err, items);
    });
}
/**
 *
 * @param user
 * @param count
 * @param callback
 */
exports.getUnreadItems = function (user, count, callback) {
    UserItemModel.UserItem.find({mark: false, "user_id": user._id}).sort({date: "desc"}).limit(count).exec(function (err, user_items) {
        Fiber(function () {
            var fiber = Fiber.current;
            var items = [];
            var size = user_items.length;
            for (var i = 0; i < size; i++) {
                var user_item = user_items[i];
                ItemModel.Item.findOne({"_id": user_item.item_id}, function (err, item) {
                    fiber.run([err, item]);
                });
                //TODO user_itemのプロパティを付加する

                var result = Fiber.yield();
                var err = result[0];
                var item = result[1];
                if (err === null && item !== null) {
                    items.push(item);
                }
            }
            callback(null, items);
        }).run();
        //callback(err, items);
    });
}

exports.getUserItemFromUserIdAndFeedId = function (user_id, item_id, callback) {
    UserItemModel.UserItem.findOne({"user_id":user_id, "item_id":item_id}, function(err, item){
        callback(item);
    });
}

exports.insertUserItem = function (user_id, item, callback) {
    exports.getUserItemFromUserIdAndFeedId(user_id, item._id, function (i) {
        if (i === null) {
            //new
            console.log("new");
            i = new UserItemModel.UserItem();
            i.user_id = user_id;
            i.item_id = item._id;
            i.date = item.date;
            i.mark=false;
            i.fav=false;
            i.later=false;
            i.tags=[];
            i.save(function(err){
                callback(err, i);
            });
        }
        else {
            //exists
            console.log("already exists:" + user_id + " user_item:" + i._id);
            callback(null, i);
        }
    });
}