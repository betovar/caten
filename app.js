#!/usr/bin/env node

Error.stackTraceLimit = Infinity;

/**
 * Web Server Initialization
 */

var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , path = require('path');

//var dice = require('./node_modules/qrand/lib/qrand'); //FIXME

app.configure(function() {
  app.set('port', 8080);
  app.set('views', path.join(__dirname, '/views'));
  app.set('view engine', 'jade');
  app.use(express.favicon(path.join(__dirname, 'public/favicon.ico'))); 
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
  app.use(express.errorHandler());
});

server.listen(app.get('port'), function() {
  console.log('Express server running in %s mode on port %s' 
    , app.get('env')
    , app.get('port')
  );
});

/**
 * Routes Definitions
 */

var routes = require('./routes')
  , game = require('./routes/game.js');

app.get('/newgame', game.newgame);
app.get('/roll', game.rolldice);
app.get('/', routes.index);

/**
 * Socket Handling
 */

var room = io
  .of('/game')
  .on('connection', function (socket) {
    socket.broadcast.emit('message', {
      test: 'works'
    });
  });