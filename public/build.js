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
		.data(data.tile.reverse())
		.enter()
		.append("g")
		.attr("class", function(d) { return d.resource; });
	tiles.append("polygon")
		.attr("class", "hex")
		.attr("points", data.geometry.hexagon);
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

	tiles.select(".desert circle")
		.remove();
	tiles.selectAll(".desert text")
		.remove();

	tiles.transition()
		.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
		.delay(function(d, i) { return (19-i) * 250; })
		.duration(1000)
}