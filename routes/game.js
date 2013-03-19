module.exports = function(app) { 
  app.get('/g/:gameid', function(req, res) { 
    res.render('game', {id: req.params.gameid}); 
  }); 
} 