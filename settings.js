/**
 * Created with JetBrains WebStorm.
 * User: yagitoshihiro
 * Date: 2013/04/01
 * Time: 0:46
 * To change this template use File | Settings | File Templates.
 */
exports.local_port=3001;
exports.debug = false;
//boot mode
exports.auth = {
    twitter:{
        twitterConsumerKey:"set your twitter app consumer key."
        ,twitterConsumerSecret:"set your twitter app consumer secret."
        ,twitterAuthCallbackURL:"set your oauth callback url."
        ,twitterDomain:"set your domain."
    }
};

exports.cronTime = "*/30 * * * *";
