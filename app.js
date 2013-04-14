// Web Server Initialization
var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , passport = require('passport')
  , path = require('path');

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


// Authentication
var twitter = require('passport-twitter').Strategy;
passport.use(new twitter({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: process.env.TWITTER_CALLBACK_URL
}, function(token, tokenSecret, profile, done) {
  // asynchronous verification, for effect...
  process.nextTick(function () {
    // To keep the example simple, the user's Twitter profile is returned to
    // represent the logged-in user.  In a typical application, you would want
    // to associate the Twitter account with a user record in your database,
    // and return that user instead.
    return done(null, profile);
  });
}));
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

// Route Definitions
app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { 
    failureRedirect: '/login' 
  }), function(req, res) { 
    console.log(req.query.oauth_token); 
    res.redirect('/'); 
  }
);
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/login', function(req, res) {
  res.render('/', { user: req.user });
});
app.get('/logout', function(req, res) { 
  req.session = null; 
  req.logout(); 
  res.redirect('/'); 
}); 
app.get('/:id', function(req, res) { 
  res.render('game', {title:'Settlers of Caten', gameid: req.params.id}); 
}); 
app.get('/', function(req, res) { 
  res.render('home', {title: 'Settlers of Caten'}); 
}); 


// Socket Handling
var io = require('socket.io').listen(server) 
  //, nodemailer = require("nodemailer") 
  //, redis  = require("redis"),
  //, client = redis.createClient();
var game = io.of('').on('connection', function (socket) { 
  socket.of('/game').on('join', function(room) { 
    client.auth("somepass");
    console.log(socket.id + " connected"); 
    socket.join(room); 
    io.of('/game').in(room).emit('joined', {username:socket.id}); 
  }); 
}); 