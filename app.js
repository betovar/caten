// Web Server Initialization
var express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  passport = require('passport'),
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
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});
app.configure('development', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  Error.stackTraceLimit = Infinity;
  app.set('port', 8080);
  app.set('URI', "http://127.0.0.1:"+app.get('port')); //necessary for twitter
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
var twitter = require('passport-twitter').Strategy;
passport.use(new twitter({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: app.get('URI')+"/auth/twitter/callback"
}, function(token, tokenSecret, profile, done) {
  // To keep the example simple, the user's Twitter profile is returned to
  // represent the logged-in user.  In a typical application, you would want
  // to associate the Twitter account with a user record in your database,
  // and return that user instead.
  console.log(profile);
  return done(null, profile);
}));
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

// Route Definitions
app.get('/auth/twitter/callback',
  //NB: https://dev.twitter.com/issues/824
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    console.log(req.query);
    res.redirect('/');
  });
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/login', function(req, res) {
  res.render('login', {title: 'Login'});
});
app.get('/logout', function(req, res) {
  //req.session = null;
  req.logout();
  res.redirect('/');
});
app.get('/form', function(req, res) {
  res.render('form', {title: 'Create Game'});
});
app.get('/:id', function(req, res) {
  res.render('game', {title:'Caten', gameid: req.params.id});
});
app.get('/', function(req, res) {
  res.render('home', {title: 'Settlers of Caten'});
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