#!/usr/bin/env node

/**
 * Web Server Initialization
 */

var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , path = require('path');
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
 * Route Definitions
 */

var routes = require('./routes');
app.get('/', routes.index);

/**
 * Socket Handling
 */

var random = require('node-random') 
  , game = require('./routes/game.js');

io.sockets.on('connection', function(socket) { 
  socket.on('join', function() {
    var temp = [ 
      { profile: 'northwest', username: 'Eduardo', style: 'p1' },
      { profile: 'northeast', username: 'Paul', style: 'p2' },
      { profile: 'southeast', username: 'Brian', style: 'p3' },
      { profile: 'southwest', username: 'Andres', style: 'p4' } 
    ];
    console.log(temp);
    socket.emit('joined', temp );
//    socket.broadcast.emit('joined', temp );
    socket.emit('start', game.new({}) );
  });
  //socket.emit('start', game.new({ hexes: 'shuffle' }) ); 
  
  socket.on('roll', function() { 
    //FIXME check whose turn it is
    random.integers({ 
      "number": 2, 
      "minimum": 1, 
      "maximum": 6, 
      "base": 10 }, function(err, data) { 
        if (err) throw err; 
        console.log('%s', data); 
        socket.broadcast.emit('rolled', data);
      }); 
  }); 
  socket.on('buy', function(data) {
  });
  socket.on('disconnect', function() { 
    console.log(socket.id + ' disconnected'); 
    socket.broadcast.emit('exited', socket.id);
  }); 
}); 