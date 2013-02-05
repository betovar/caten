
/*
 * GET newgame data
 */

exports.newgame = function(req, res) {
	var chitlist = [5, 2, 6, 3, 8, 10, 9, 12, 11, 4, 8, 10, 9, 4, 5, 6, 3, 11];
	var hexlist = [	
		"quarry",	"fields", "forest", "quarry",
		"fields", "pasture", "fields", "pasture",
		"forest", "hills", "desert", "hills",
		"pasture", "pasture", "forest", "hills",
		"quarry", "forest", "fields"
	];

	var json = {	
		"tile": [
			{ "x": -173.2, "y": 300 },
			{ "x": 0, "y": 300 },
			{ "x": 173.2, "y": 300 },
			{ "x": 259.8, "y": 150 },
			{ "x": 346.4, "y": 0 },
			{ "x": 259.8, "y": -150 },
			{ "x": 173.2, "y": -300 },
			{ "x": 0, "y": -300 },
			{ "x": -173.2, "y": -300 },
			{ "x": -259.8, "y": -150 },
			{ "x": -346.4, "y": 0 },
			{ "x": -259.8, "y": 150 },
			{ "x": -86.6, "y": 150 },
			{ "x": 86.6, "y": 150 },
			{ "x": 173.2, "y": 0 },
			{ "x": 86.6, "y": -150 },
			{ "x": -86.6, "y": -150 },
			{ "x": -173.2, "y": 0 },
			{ "x": 0, "y": 0 }
		],
	"geometry": {
		"viewbox": "-555 -500 1110 1000",
		"seaframe": "275,476.3 550,0 275,-476.3 -275,-476.3 -550,0 -275,476.3",
		"harbor": "",
		"hexagon": "86.6,50 0,100 -86.6,50 -86.6,-50 0,-100 86.6,-50",
		"road": "",
		"settlement": "-15,15 -15,-5 0,-15 15,-5 15,15",
		"city": "-15,-5 -15,-15 0,-25 15,-15 15,-5 30,-5 30,15 -30,15 -30,-5"
	}
};

	shuffle(hexlist);
	//shuffle(chitlist);

	var dsrt = 0;
	for (var i=0; i<hexlist.length; i++) {
		json.tile[i]["resource"] = hexlist[i];
		if (hexlist[i] != "desert") { json.tile[i]["chit"] = chitlist[i-dsrt]; }
		else { dsrt += 1; }
		if (chitlist[i-dsrt] == 6) { json.tile[i]["color"] = "maroon"; }
		if (chitlist[i-dsrt] == 8) { json.tile[i]["color"] = "maroon"; }
	}

	res.send(json);
}

function shuffle( list ) {
	for (var i=(list.length-1); i>0; i--) {
		var j = Math.floor( i*Math.random() );
		var temp = list[j];
		list[j] = list[i];
		list[i] = temp;
	}
}