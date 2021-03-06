/**
 * Created with JetBrains WebStorm.
 * User: yagitoshihiro
 * Date: 2013/04/07
 * Time: 16:29
 * To change this template use File | Settings | File Templates.
 */
var FeedModel = require("./FeedModel");
var UserModel = require("./UserModel");
var UserFeedModel = require("./UserFeedModel");

/**
 * FeedのIDから全てのUserFeedを取り出す
 * @param user
 * @param feed_id
 * @param callback
 */
exports.getAllUserFeedFromFeedId = function (feed_id, callback) {
    UserFeedModel.UserFeed.find({"feed_id": feed_id}, function (err, user_feed) {
        if (err !== null) {
            console.log("err:" + err);
        }
        callback(err, user_feed);
    });
}

/**
 * フィードを登録する
 * @param user
 * @param model
 * @param callback
 */
exports.addUserFeed = function (user, model, callback) {
    console.log("add feed:" + model);
    exports.getUserFeed(user, model._id, function (err, feed) {
        if (feed === null) {
            //create
            var newFeed = new UserFeedModel.UserFeed();
            newFeed.user_id = user._id;
            newFeed.feed_id = model._id;
            UserFeedModel.UserFeed.create(newFeed, function (err2, created) {
                callback(err2, created);
            });
        }
        else {
            callback(err, feed);
        }
    });
}

/**
 *
 * @param feeds
 * @param user_feeds
 * @param callback
 */
function getFeeds(feeds, user_feeds, callback) {
    var user_feed = user_feeds.head();
    if (user_feed === null) {
        callback();
        return;
    }
    FeedModel.Feed.findOne({"_id": user_feed.feed_id}, function (err, feed) {
        if (err !== null) {
            console.log("err:" + err);
        }
        if (feed !== null) {
            feeds.push(feed);
        }
        getFeeds(feeds, user_feeds.tail(), callback);
    });
}

/**
 * Userが登録しているフィードを全て取得する
 * @param user
 * @param callback
 */
exports.getFeedsFromUserFeeds = function (user, callback) {
    var feeds = [];
    UserFeedModel.UserFeed.find({"user_id": user._id}, function (err, user_feeds) {
        getFeeds(feeds, user_feeds, function () {
            callback(err, feeds);
        })
    });
}

/**
 * 指定したfeed_idのUserFeedModelを取得する。
 * @param user
 * @param feed_id
 * @param callback
 */
exports.getUserFeed = function (user, feed_id, callback) {
    UserFeedModel.UserFeed.findOne({"user_id": user._id, "feed_id": feed_id}, function (err, user_feed) {
        callback(err, user_feed);
    });
}
/**
 *
 * @param user
 * @param feed_id
 * @param callback
 */
exports.getRemoveUserFeed = function (user, feed_id, callback) {
    UserFeedModel.UserFeed.remove({"user_id": user._id, "feed_id": feed_id }, function (err, user_feed) {
        callback(err, user_feed);
    });
}

/**
 * フィードを追加する
 * @param user
 * @param url
 * @param callback
 */
exports.addUserFeed = function (user, feed, callback) {
    if (user == null || feed == null) {
        callback("null param: user=" + user + " feed:" + feed, null);
        return;
    }
    //フィードが存在するかどうか
    exports.getUserFeed(user, feed._id, function(err, user_feed){
        if(user_feed !== null){
            callback("already exists", user_feed);
        }
        else{
            //user_feedに追加する
            user_feed = new UserFeedModel.UserFeed();
            user_feed.user_id = user._id;
            user_feed.feed_id = feed._id;
            user_feed.save(function(err){
               callback(err, user_feed);
            });
        }
    });
}
