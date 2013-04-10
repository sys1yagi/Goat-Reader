/**
 * Module dependencies.
 */
require("./modules/util/jsExtensions");
var express = require('express')
    , http = require('http')
    , path = require('path')
    , fs = require('fs')
    , routes = require('./routes')
    , settings = require("./settings")
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
    app.use(express.bodyParser({uploadDir:"tmp"}));
    app.use(express.methodOverride());

    app.use(express.cookieParser());
    app.use(express.session({
        secret: conf.secret,
        maxAge: new Date(Date.now() + 3600000),
        store: new MongoStore(conf.db)
    }));
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
    , onTick: function() {
        handle(null, null);
    }

    // A function that will fire when the job is complete, when it is stopped
    , onComplete: function() {
        console.log('Completed.')
    }

    // Specified whether to start the job after just before exiting the constructor.
    , start: false
//    , timeZone: "Japan/Tokyo"
});
job.start();
