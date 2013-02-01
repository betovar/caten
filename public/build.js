var data;
var dots = [".....", "....", "...", "..", "."];

d3.json("/standard-basic.json", function(err, json) {
  if (err) return console.warn(err);
  data = json;
  build();
});

function build() {
	var board = d3.select("#board")
		.attr("viewBox", data.geometry.viewbox)
		.attr("type", "image/svg+xml")
		.attr("preserveAspectRatio", "xMidYMid meet");

	var frame = d3.select("#ocean")
		.append("polygon")
			.attr("points", data.geometry.seaframe);

	var ports = d3.select("#harbors");

	var tiles = d3.select("#hexes").selectAll("g")
		.data(data.tile)
		.enter()
		.append("g")
		.attr("class", "tile");
	tiles.append("polygon")
		.attr("points", data.geometry.hexagon)
		.attr("class", function(d) { return d.resource; });
	tiles.append("circle")
		.attr("class", "chit")
		.attr("r", 30);
	tiles.append("text")
		.attr("y", -5)
		.text(function(d) { return d.chit; });
	tiles.append("text")
		.attr("y", 5)
		.text(function(d) { 
			return dots[Math.abs(d.chit-7)-1]
		});

	tiles.transition()
		.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
		.delay(function(d, i) { return i * 50; })
		.duration(250)
}