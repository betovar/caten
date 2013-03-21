/*
 * GET home page
 */

module.exports = function(app) { 
  app.get('/g/:gameid', function(req, res) { 
    res.render('game', {title:'Work in Progress', gameid: req.id}); 
  }); 
  app.get('/', function(req, res) { 
    res.render('home', {title: 'Settlers of Caten'}); 
  }); 
}