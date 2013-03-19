#!/usr/bin/env node

/**
 * Web Server Initialization
 */

var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  //, RedisStore = require('connect-redis')(express)
  //, sessionStore = new RedisStore()
  //, nodemailer = require("nodemailer") 
  , path = require('path');

app.configure(function() {
  app.set('views', path.join(__dirname, './views'));
  app.set('view engine', 'jade');
  app.use(express.favicon(path.join(__dirname, 'public/favicon.ico'))); 
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
/*app.use(express.cookieParser());
  app.use(express.session({
      secret: 'YOURSOOPERSEKRITKEY',
      store: sessionStore
  }));*/
});
app.configure('development', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  Error.stackTraceLimit = Infinity;
  app.set('port', 8080);
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

/*
io.configure(function() {
  io.set('authorization', function(data, callback) {
    if (data.headers.cookie) {
      var cookie = parseCookie(data.headers.cookie);
      sessionStore.get(cookie['connect.sid'], function(err, session) {
        if (err || !session) {
          callback('Error', false);
        } else {
          data.session = session;
          callback(null, true);
        }
      });
    } else {
      callback('No cookie', false);
    }
  });
});*/

/**
 * Route Definitions
 */

//var routes = require('./routes');
app.get('/', function(req, res) { 
  res.render('home', {title: 'Settlers of Caten'}); 
}); 

/**
 * Socket Handling
 */

var random = require('node-random') 
  , game = require('./game');

io.sockets.on('connection', function(socket) { 
  socket.on('join', function() {
    /*socket.emit('joined', [ 
      { profile: 'northwest', username: 'Eduardo', style: 'p1' },
      { profile: 'northeast', username: 'Paul', style: 'p2' },
      { profile: 'southeast', username: 'Brian', style: 'p3' },
      { profile: 'southwest', username: 'Andres', style: 'p4' } 
    ] );*/
    //socket.broadcast.emit('joined', temp );
    //socket.emit('start', game.new() );
    console.log(socket.id + " connected"); 
  });
  //socket.emit('start', game.new({ hexes: 'shuffle' }) ); 
  
  //socket.on('roll', game.roll ); 
  //socket.on('buy', game.buy );
  socket.on('disconnect', function() { 
    console.log(socket.id + ' disconnected'); 
    socket.broadcast.emit('exited', socket.id);
  }); 
}); 