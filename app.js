// Web Server Initialization
var express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  passport = require('passport'),
  redis = require('redis'),
  //db = require('./game/database.js'),
  RedisStore = require('connect-redis')(express);

app.configure(function () {
  app.set('views', 'views');
  app.set('view engine', 'jade');
  app.use(express.static('public'));
  app.use(express.favicon('public/favicon.ico'));
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({
    secret: process.env.SESSION_SECRET,
    store: new RedisStore({
      db: 0,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      pass: process.env.REDIS_PASSS
    })
  }));
  app.use(express.cookieSession({secret: 'mysecret'}));
  app.use(express.methodOverride());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});
app.configure('development', function () {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  Error.stackTraceLimit = Infinity;
  app.set('port', 8080);
  app.set('URI', 'http://127.0.0.1:'+app.get('port'));
});
app.configure('production', function () {
  app.use(express.errorHandler());
  app.set('URI', 'http://'+process.env.SUBDOMAIN+'.jit.su');
});
server.listen(app.get('port'), function () {
  console.log('Express server running in %s mode on port %s',
    app.get('env'), app.get('port')
  );
});


// User Authentication
var twitter = require('passport-twitter').Strategy;
passport.use(new twitter({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: app.get('URI')+'/auth/twitter/callback'
}, function (token, tokenSecret, profile, done) {
  console.log(profile);
  //console.log(db.keys());
  return done(null, profile);
}));
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  else { res.redirect('/login'); }
}


// Route Definitions
app.get('/auth/twitter/callback',
  //NB: https://dev.twitter.com/issues/824
  passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/login', function (req, res) {
  res.render('login', {
    title: 'Login',
    menu: [{name: 'Home', link: '/'}]
  });
});
app.post('/login',
  passport.authenticate('twitter', {failureRedirect: '/login'}),
  function (req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    console.log("auth success!");
    res.redirect('/account');
  }
);
app.get('/logout', function (req, res) {
  //req.session = null;
  req.logout();
  res.redirect('/');
});
app.get('/account', function (req, res) {
  res.render('account', {
    title: 'User Account',
    user: req.user,
    menu: [
      {name:'Lobby', link:'/lobby'},
      {name:'New', link:'/new'},
      {name:'Home', link:'/'} ]
  });
});
app.get('/lobby', function (req, res) {
  res.render('lobby', {
    title: 'Lobby',
    menu: [
      {name: 'New', link: '/new'},
      {name: 'Home', link: '/'} ]
  });
});
app.get('/new', function (req, res) {
  res.render('newgame', {
    title: 'New Game',
    menu: [
      {name: 'Lobby', link: '/lobby'},
      {name: 'Home', link: '/'} ]
  });
});
app.post('/new', function (req, res) {
  console.log(req.body);
  res.redirect('/lobby');
});
app.get('/home', function (req, res) {
  res.redirect('/');
});
app.get('/:id', function (req, res) {
  res.render('game', {
    title:'Caten',
    gameid: req.params.id,
    menu: [{name: 'Home', link: '/'} ]
  });
});
app.get('/', function (req, res) {
  res.render('home', {
    title: 'Settlers of Caten',
    menu: [{name: 'Login', link: '/login'} ]
  });
});


// Socket Handling
var io = require('socket.io').listen(server);
io.of('').on('connection', function (socket) {
  socket.on('join', function (room) {
    socket.join(room);
    io.of('').in(room).emit('joined', {username:socket.id});
    console.log(socket.id + ' connected');
  });
  socket.on('disconnect', function (socket) {
    io.of('').emit('exited', {username:socket.id});
  });
});
