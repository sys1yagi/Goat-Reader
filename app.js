/**
 * Module dependencies.
 */
var express = require('express')
    , routes = require('./routes')
    , api = require('./routes/api')
    , http = require('http')
    , path = require('path')
    , fs = require('fs')
    , io = require('socket.io')
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
app.get(api.xml2json.path(), api.xml2json.handle());
//start server
var server = http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});

//initialize socket.io
var sio = io.listen(server);
sio.on('connection', function(client) {

    //ユーザー接続時の初期化処理

    // Message受信時のハンドラ
    client.on('message',function(message){
        client.send(message);
        client.broadcast(message);
    });

    // クライアント切断時のハンドラ
    client.on('disconnect', function(){
        // クライアントがleaveしたことを接続ユーザーへ送信
        client.broadcast(JSON.stringify(
            {status:"disconnect",
                id:client.sessionId}));
    });
}) ;
