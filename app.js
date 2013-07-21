// Web Server Initialization
var express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  path = require('path');

app.configure(function() {
  app.set('views', path.join(__dirname, './views'));
  app.set('view engine', 'jade');
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.favicon(path.join(__dirname, 'public/favicon.ico')));
  app.use(express.favicon('public/favicon.ico'));
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  //app.use(express.cookieSession({secret: 'mysecret'}));
  app.use(express.session({ secret: process.env.SESSION_SECRET}));
  app.use(app.router);
});
app.configure('development', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  Error.stackTraceLimit = Infinity;
  app.set('port', 8080);
  app.set('URI', "http://127.0.0.1:"+app.get('port'));
});
app.configure('production', function() {
  app.use(express.errorHandler());
  app.set('URI', "http://"+process.env.SUBDOMAIN+".jit.su");
});
server.listen(app.get('port'), function() {
  console.log('Express server running in %s mode on port %s',
    app.get('env'), app.get('port')
  );
});


// Authentication
require('./game/auth.js')(app);
var passport = require('passport');

// Route Definitions
app.get('/auth/twitter/callback',
  //NB: https://dev.twitter.com/issues/824
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    console.log(req.query);
    res.redirect('/account');
  });
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/login', function(req, res) {
  res.render('login', {title: 'Login'});
});
app.post('/login',
  passport.authenticate('twitter'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/account');
  });
app.get('/logout', function(req, res) {
  //req.session = null;
  req.logout();
  res.redirect('/');
});
app.get('/account', function(req, res) {
  res.render('account', {title: 'User Account', user: req.user});
});
app.get('/lobby', function(req, res) {
  res.render('lobby', {title: 'Lobby'});
});
app.get('/new', function(req, res) {
  res.render('newgame', {title: 'New Game'});
});
app.post('/new', function(req, res) {
  console.log(req.body);
  res.redirect('/lobby');
});
app.get('/home', function(req, res) {
  res.redirect('/');
});
app.get('/:id', function(req, res) {
  res.render('game', {title:'Caten', gameid: req.params.id});
});
app.get('/', function(req, res) {
  res.render('home', {title: 'Settlers of Caten',
    menu: [{name: 'Login', link: '/login'}] });
});


/*// Socket Handling
var io = require('socket.io').listen(server);
io.of('').on('connection', function (socket) {
  socket.on('join', function(room) {
    socket.join(room);
    io.of('').in(room).emit('joined', {username:socket.id});
    console.log(socket.id + " connected");
  });
  socket.on('disconnect', function(socket) {
    io.of('').emit('exited', {username:socket.id});
  });
});*/