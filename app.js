/**
 * Module dependencies.
 */
require("./modules/util/JsExtensions");
var express = require('express')
    , http = require('http')
    , path = require('path')
    , fs = require('fs')
    , passport = require('passport')
    , TwitterStrategy = require('passport-twitter')
    , routes = require('./routes')
    , settings = require("./settings")
    , crypto = require('crypto')
    , os = require("os");
;
var local_port = settings.local_port;
var app = express();

//session conf
var conf = {
    db: {
        db: 'goatreader',
        host: 'localhost'
    },
    //ここの値は適宜書き換える
    secret: 'LuYJYADZMqOQVhjUZqZAoHDbjAwy87'
};
var MongoStore = require('connect-mongo')(express);
//sever conf
app.configure(function () {
    app.set('port', process.env.PORT || local_port);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    //app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser({uploadDir: "tmp"}));
    app.use(express.methodOverride());

    app.use(express.cookieParser());
    app.use(express.session({
        secret: conf.secret,
        maxAge: new Date(Date.now() + 3600000),
        store: new MongoStore(conf.db)
    }));


    app.use(passport.initialize());
    app.use(passport.session());

    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

//initialize route
app.get('/', routes.index);
app.get('/about', routes.about);
app.get('/settings', routes.settings);

var handlers = require("./routes/handlers");
handlers.initilize(app);

//init twitter oauth
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (obj, done) {
    done(null, obj);
});


//Twitter OAuth
var TWITTER_CONSUMER_KEY = settings.auth.twitter.twitterConsumerKey;
var TWITTER_CONSUMER_SECRET = settings.auth.twitter.twitterConsumerSecret;
passport.use(new TwitterStrategy.Strategy({
        consumerKey: TWITTER_CONSUMER_KEY,
        consumerSecret: TWITTER_CONSUMER_SECRET,
        callbackURL: "http://" + os.hostname() + ":" + local_port + "/auth/twitter/callback"
    },
    function (token, tokenSecret, profile, done) {
        passport.session.accessToken = token;
        passport.session.profile = profile;
        process.nextTick(function () {
            return done(null, profile);
        });
    }
));
app.get('/account/twitter', twitterEnsureAuthenticated, routes.index);
app.get('/auth/twitter',
    passport.authenticate('twitter'),
    function (req, res) {
    }
);

var UserModelDao = require("./modules/model/UserModelDao");
app.get('/auth/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/' }),
    function (req, res) {
        //ここでsession tokenを生成する
        console.log("token=" + req.query["oauth_token"]);
        req.session.twitter = {
            "oauth_token": req.query["oauth_token"],
            "oauth_verifier": req.query["oauth_verifier"]
        }
        var md5 = crypto.createHash('md5');
        md5.update(req.session.twitter.oauth_token, 'utf8');
        req.session.session_token = md5.digest('hex');
        console.log("md5:" + req.session.session_token);

        //get user data or new user.
        UserModelDao.startSession(req, function (user) {
            res.redirect('/');
        });
    }
);
app.get('/logout/twitter', function (req, res) {
    UserModelDao.getUser(req, function (user) {
        if (user != null) {
            user.session_token = "";
            user.save(function (err) {
                req.logout();
                res.redirect('/');
            });
        }
        else{
            res.redirect('/');
        }
    });
});
function twitterEnsureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
};

//start server
var server = http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});

//cron jobs
var cronJob = require('cron').CronJob;
var cronTime = settings.cronTime;
var Crawl = require("./routes/handler/CrawlHandler");
var handle = Crawl.module.handle();
job = new cronJob({
    // The time to fire off your job.
    cronTime: cronTime

    // The function to fire at the specified time.
    , onTick: function () {
        handle(null, null);
    }

    // A function that will fire when the job is complete, when it is stopped
    , onComplete: function () {
        console.log('Completed.')
    }

    // Specified whether to start the job after just before exiting the constructor.
    , start: false
//    , timeZone: "Japan/Tokyo"
});
job.start();
