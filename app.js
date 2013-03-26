#!/usr/bin/env node

/**
 * Web Server Initialization
 */

var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  //, redis = require('redis')
  //, nodemailer = require("nodemailer") 
  , path = require('path');

app.configure(function() {
  app.set('views', path.join(__dirname, './views'));
  app.set('view engine', 'jade');
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.favicon(path.join(__dirname, 'public/favicon.ico'))); 
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});
app.configure('development', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  Error.stackTraceLimit = Infinity;
  app.set('port', 8080);
});
app.configure('production', function() {
  app.use(express.errorHandler());
  //app.set('port', process.env.PORT);
});
server.listen(app.get('port'), function() {
  console.log('Express server running in %s mode on port %s' 
    , app.get('env')
    , app.get('port')
  );
});

/**
 * Route Definitions
 */

var routes = require('./routes')(app);

/**
 * Socket Handling
 *

var game = io.of('/game').on('connection', function (socket) {
  socket.on('join', function() {
    console.log(socket.id + " connected"); 
  }); 
  //io.of('game').in('room').emit('event_name', data);
});*/