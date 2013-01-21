
/*
 * GET home page.
 */

var myrand = require('../dice');

exports.index = function(req, res){
  res.render('index', { title: 'Caten', 
  						gameid: myrand.rand('dec', 10) });
};