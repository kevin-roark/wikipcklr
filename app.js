'use strict';
var wikiTitle;

var express = require('express'),
    app = express(),
    http = require('http'),
    path = require('path'),
   // wiki = require('./libs/wiki.js'),
    gifs = require('./libs/gifs.js'),
    server = http.createServer(app),
    io = require('socket.io').listen(server);

/*var http = require('http');
var server = http.createServer(function (req, res) {
   res.writeHead(200, {'Content-Type': 'text/plain'});
   res.end('Hello World\nsup\n<a href="http://www.google.com">hey google</a>\n');
});
server.listen(process.env.PORT);*/

app.configure(function () {
    app.set('port', process.env.PORT);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
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

app.get('/', function (req, res) {
    gifs.getRandomPageID(function(fetched) {
            res.render('index', {
                title: 'wikipcklr',
                wikicontent: fetched,
                tumblrcontent: 'ok',
                choice1: 'test1',
                choice2: 'test2',
                choice3: 'test3',
                choice4: 'test4'
            });
    });
});

app.get('/play', function (req, res) {
    var tag = req.params.thread + '+gif';
    gifs.getGifs(tag, function (fetched) {
        res.render('messages', {
            title: req.param('thread'),
            keyboard: fetched
        });
    });
});

app.post('/', function(request, response){

    console.log(request.body.choice);

});

/*app.get('/api/gifs', function (req, res) {
    gifs.getGifs('gif', function (fetched) {
        var limit = req.query.limit || fetched.length;
        res.json(fetched.slice(0, limit));
    });
});

io.on('connection', function (client) {
    client.on('message', function (message) {
        message = JSON.parse(message);
        var out = JSON.stringify({ msg: message.message });
        client.join(message.channelName);
        io.sockets.in(message.channelName).emit('message', out);
    });
});*/

server.listen(process.env.PORT);