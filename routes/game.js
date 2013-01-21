
/*
 * GET new game page.
 */

exports.game = function(req, res){
  res.render('game', { title: 'Caten', gameid: qrand.getRandomHexOctets() });
};