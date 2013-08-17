exports.local_port=3001;
exports.debug = false;
exports.auth = {
    twitter:{
        twitterConsumerKey:"wEyzGs3XdveLuDRYYc0TXw"
        ,twitterConsumerSecret:"L202XkMnbXCHNcTurnp4E0XJkvIULBIMYRSNw2rzGQ"
        ,callbackURL:"http://localhost:3001/auth/twitter/callback"
    }
};
exports.cronTime = "*/30 * * * *";
