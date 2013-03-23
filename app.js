/**
 * Module dependencies.
 */
var express = require('express')
    , routes = require('./routes')
    , api = require('./routes/api')
    , http = require('http')
    , path = require('path')
    , fs = require('fs')
    ;
var local_port = 3000;
var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || local_port);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here'));
    app.use(express.session());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

//initialize route
app.get('/', routes.index);
app.get('/settings', routes.settings);

var handlers = require("./routes/handlers");
handlers.initilize(app);


//start server
var server = http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
