#!/usr/bin/env node

/**
 * Starts web server
 */

var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
//, io = require('socket.io').listen(server)
  , routes = require('./routes')
  , path = require('path');

//var dice = require('./node_modules/qrand/lib/qrand'); //FIXME

app.configure(function() {
  app.set('port', 8080);
  app.set('views', path.join(__dirname, '/views'));
  app.set('view engine', 'jade');
  app.use(express.favicon(path.join(__dirname, 'public/favicon.svg'))); 
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
  console.log("Express server listening on port %d in %s mode", 
    app.get('port'), app.settings.env);
});

/**
 * Defines routing
 */

app.get('/lobby', function(req, res) {
  res.render('lobby');
});
app.get('/', routes.index);