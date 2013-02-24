var socket = io.connect();

socket.on('message', function(data) {
	console.log(data);
});

socket.on('game', function(data) {
	var dots = [".....", "....", "...", "..", "."];
	var board = d3.select("#board")
		.attr("viewBox", data.shapes.viewbox)
		.attr("type", "image/svg+xml")
		.attr("preserveAspectRatio", "xMidYMid meet");

	var frame = d3.select("#ocean")
		.append("polygon")
			.attr("points", data.shapes.seaframe);

	var ports = d3.select("#harbors");

	var tiles = d3.select("#hexes").selectAll("g")
		.data(data.grid)
		.enter()
		.append("g")
		.attr("class", function(d) { return d.resource; });
	tiles.append("polygon")
		.attr("class", "hex")
		.attr("points", data.shapes.hex);
	tiles.append("circle")
		.attr("class", "chit")
		.attr("r", 30);
	tiles.append("text")
		.attr("y", -5)
		.text(function(d) { return d.chit; })
		.style("stroke", function(d) { return d.color });
	tiles.append("text")
		.attr("y", 5)
		.text(function(d) { 
			return dots[Math.abs(d.chit-7)-1]
		})
		.style("stroke", function(d) { return d.color });

	tiles.select(".desert circle").remove();
	tiles.selectAll(".desert text").remove();

	tiles.transition()
		.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
		.duration(2000);
});

function rolldice() {
	socket.emit('roll'); 
}

function buybuild(item) {
	socket.emit('buy', item ); 
}

function offertrade(cards) {
	socket.emit('offer', cards ); 
}

function passdice() {
	socket.emit('pass'); 
}