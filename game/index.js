/*
 * GET newgame data
 */

var random = require('node-random') 
  , shasum = require('crypto').createHash('sha1')
  , chits = [ 5, 2, 6, 3, 8, 10, 9, 12, 11, 4, 8, 10, 9, 4, 5, 6, 3, 11 ] 
  , hexes = [ 
    "quarry", "fields", "forest", "quarry",
    "fields", "pasture", "fields", "pasture",
    "forest", "hills", "desert", "hills",
    "pasture", "pasture", "forest", "hills",
    "quarry", "forest", "fields" ] 
  , harbors = [
    "generic", "lumber", "brick", "generic", 
    "generic", "wool", "generic", "ore", "grain" ] 
  . deck = [ 
    {type:"knight"}, {type:"knight"}, 
    {type:"knight"}, {type:"knight"}, 
    {type:"knight"}, {type:"knight"}, 
    {type:"knight"}, {type:"knight"}, 
    {type:"knight"}, {type:"knight"}, 
    {type:"knight"}, {type:"knight"}, 
    {type:"knight"}, {type:"knight"}, 
    {type:"progress", title:"monopoly"},
    {type:"progress", title:"monopoly"},
    {type:"progress", title:"invention"},
    {type:"progress", title:"invention"},
    {type:"progress", title:"construction"},
    {type:"progress", title:"construction"},
    {type:"victory", title:"chapel"},
    {type:"victory", title:"library"},
    {type:"victory", title:"market"},
    {type:"victory", title:"palace"},
    {type:"victory", title:"university"} ];

exports.newgame = function( options ) { 
  var game = {
    'id': 0, 
    'start': new Date(), 
    'title': "Settlers of Caten", 
    'size': "basic", 
    'lang': "en", 
    'shapes': { 
      'port': {cir:{cx:86,r:50},rec:{y:-20,w:50,h:40,rx:3}}, 
      'hex': "86.6,50 0,100 -86.6,50 -86.6,-50 0,-100 86.6,-50", 
      'road': "M 0 -35 L 0 35", 
      'town': "-15,15 -15,-5 0,-15 15,-5 15,15", 
      'city': "-15,-5 -15,-15 0,-25 15,-15 15,-5 30,-5 30,15 -30,15 -30,-5"
    }, 
    'ports': [ 
      {x:-173.2, y:300, angle:120 }, 
      {x:0, y:300, angle:60 }, 
      {x:259.8, y:150, angle:60 }, 
      {x:346.4, y:0, angle:0 }, 
      {x:259.8, y:-150, angle:-60 }, 
      {x:0, y:-300, angle:-60 }, 
      {x:-173.2, y:-300, angle:-120 }, 
      {x:-259.8, y:-150, angle:180 }, 
      {x:-259.8, y:150, angle:180 } ],  
    'board': [], 
    'settlements': []
  }; 
  random.strings({ 
    "length": 20, 
    "number": 10 
  }, function(err, data) { 
    if (err) throw err; 
    game.id = shasum.update(data.join()).digest("hex"); 
  }); 
  game.start = Date();
  shuffle(game.devcards);
  if (options.hexes) shuffle(game.hexes); 
  if (options.chits) shuffle(game.chits); 
  if (options.ports) shuffle(game.ports); 
  for (var i in game.ports) { 
    game.ports[i]['flavor'] = harbors[i];
  }
  for (var temp=hexgrid([0,1]), len=temp.length, i=0; i<len; i++) { 
    game['board'].push({ 
      'x': Math.round(temp[i].x*10)/10, 
      'y': Math.round(temp[i].y*10)/10 
    }); 
  } 
  for (var dsrt=0, len=hexes.length, i=0; i<len; i++) { 
    game.board[i]['resource'] = hexes[i]; 
    if (hexes[i] != 'desert') game.board[i]['chit'] = chits[i-dsrt]; 
    else dsrt += 1; 
    if (chits[i-dsrt] == 6) game.board[i]['color'] = "maroon"; 
    if (chits[i-dsrt] == 8) game.board[i]['color'] = "maroon"; 
  } 
  return 'demo';
}

/*
 *  Generates points for a hexagonal grid
 */
function hexgrid( layers ) {
  var hexes = [{ x:0, y:0 }]
  , c = Math.cos(Math.PI/3.0)
  , s = Math.sin(Math.PI/3.0)
  , r=173.2;
  for (var j in layers) { 
    var last = hexes[0];
    hexes.unshift({
      'x': last.x-r,
      'y': last.y
    });
    for (var i=0; i<=j-1; i++) { 
      last = hexes[0];
      hexes.unshift({
        'x': last.x-r*c,
        'y': last.y-r*s
      });
    }
    for (var i=0; i<=j; i++) { 
      last = hexes[0];
      hexes.unshift({
        'x': last.x+r*c,
        'y': last.y-r*s
      });
    }
    for (var i=0; i<=j; i++) { 
      last = hexes[0];
      hexes.unshift({
        'x': last.x+r,
        'y': last.y
      });
    }
    for (var i=0; i<=j; i++) { 
      if (i == 2) break;
      last = hexes[0];
      hexes.unshift({
        'x': last.x+r*c,
        'y': last.y+r*s
      });
    }
    if (j == 2) break;
    for (var i=0; i<=j; i++) { 
      last = hexes[0];
      hexes.unshift({
        'x': last.x-r*c,
        'y': last.y+r*s
      });
    }
    for (var i=0; i<=j; i++) { 
      last = hexes[0];
      hexes.unshift({
        'x': last.x-r,
        'y': last.y
      });
    }
  }
  return hexes;
}

/*
 *  Fisher-Yates shuffle: http://bost.ocks.org/mike/shuffle/compare.html 
 */
function shuffle( list ) { 
  random.sequences({ 
    "minimum": 0, 
    "maximum": list.length-1 
  }, function(error, data) { 
    if (error) throw error; 
    console.log(data); 
  }); 
  for (var temp=list.slice(0), i=list.length; i--; ) { 
    list[data[i]] = temp[i]; 
  }
}