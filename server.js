#!/usr/bin/env node

/**
 * Starts web server
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

//var dice = require('./node_modules/qrand/lib/qrand'); //FIXME

var app = express();

app.configure(function(){
  app.set('port', 8080);
  app.set('views', path.join(__dirname, '/views'));
  app.set('view engine', 'jade');
  app.use(express.favicon(path.join(__dirname, '/public/favicon.svg'))); 
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.get('/game', function(req, res) {
  res.render('game', { title: 'Caten', gameid: 'bdd81dc887d84899cf3b' });
});
app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
});