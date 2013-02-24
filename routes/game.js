/*
 * GET newgame data
 */

var random = require('node-random') 
	, chits = [5, 2, 6, 3, 8, 10, 9, 12, 11, 4, 8, 10, 9, 4, 5, 6, 3, 11] 
	, hexes = [	
		"quarry",	"fields", "forest", "quarry",
		"fields", "pasture", "fields", "pasture",
		"forest", "hills", "desert", "hills",
		"pasture", "pasture", "forest", "hills",
		"quarry", "forest", "fields"
	]; 

exports.new = function( options ) { 
  var shasum = require('crypto').createHash('sha1') 
  , game = {
  	'id': 0,
  	'start': new Date(),
  	'title': "Settlers of Caten", 
  	'size': "basic", 
  	'lang': "en", 
  	'shapes': {},
  	'grid': []
  }; 

	if (options.hexes) shuffle(hexes); 
	if (options.chits) shuffle(chits); 

	random.strings({ 
    "length": 20, 
    "number": 10 }, function(err, data) { 
      if (err) throw err; 
      game['id'] = shasum.update(data.join()).digest("hex"); 
    }); 
  game['shapes'] = { 
		'viewbox': "-555 -500 1110 1000",
		'seaframe': "275,476.3 550,0 275,-476.3 -275,-476.3 -550,0 -275,476.3",
		'port': "",
		'hex': "86.6,50 0,100 -86.6,50 -86.6,-50 0,-100 86.6,-50",
		'road': "",
		'town': "-15,15 -15,-5 0,-15 15,-5 15,15",
		'city': "-15,-5 -15,-15 0,-25 15,-15 15,-5 30,-5 30,15 -30,15 -30,-5"
	};
	var temp = hexgrid([0,1]);
	for (var i=0, len=temp.length; i<len; i++) { 
		game['grid'].push({ 
			'x': Math.round(temp[i].x*10)/10, 
			'y': Math.round(temp[i].y*10)/10 
		}); 
	} 

	var dsrt = 0; 
	for (var i=0, len=hexes.length; i<len; i++) { 
		game.grid[i]['resource'] = hexes[i]; 
		if (hexes[i] != 'desert') game.grid[i]['chit'] = chits[i-dsrt]; 
		else dsrt += 1; 
		if (chits[i-dsrt] == 6) game.grid[i]['color'] = "maroon"; 
		if (chits[i-dsrt] == 8) game.grid[i]['color'] = "maroon"; 
	} 

	return game; 
}

/*
 *	Generates points for a hexagonal grid
 */
function hexgrid(layers) {
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
 *	Fisher-Yates shuffle: http://bost.ocks.org/mike/shuffle/compare.html 
 */
function shuffle( list ) { 
	for (var i=list.length; i--; ) { 
		var j = Math.floor( (i+1)*Math.random() ); 
		var temp = list[j]; 
		list[j] = list[i]; 
		list[i] = temp; 
	}
}