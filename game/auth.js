/*
 * user AUTHENTICATION
 */

var db = require('./database.js'),
  passport = require('passport'),
  twitter = require('passport-twitter').Strategy;

module.exports = function (app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new twitter({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: app.get('URI')+'/auth/twitter/callback'
  }, function (token, tokenSecret, profile, done) {
    console.log(profile);
    //db.exists('user:'+user.name);
    return done(null, profile);
  }));
  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });

};

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
exports.ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  else { res.redirect('/login'); }
};