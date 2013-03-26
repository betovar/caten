/*
 * GET home page
 */

module.exports = function(app) { 
  app.get('/test/:id', function(req, res) { 
    res.render('test', {title:'Testing', gameid: req.params.id}); 
  }); 
  app.get('/g/:id', function(req, res) { 
    res.render('game', {title:'Settlers of Caten', gameid: req.params.id}); 
  }); 
  app.get('/', function(req, res) { 
    res.render('home', {title: 'Settlers of Caten'}); 
  }); 
}