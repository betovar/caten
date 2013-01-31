var data;

d3.json("/standard-basic.json", function(err, json) {
  if (err) return console.warn(err);
  data = json;
});

var board = d3.select("#board")
	.attr("width", 1110)
	.attr("height", 1000)
	.attr("viewBox", "-555 -500 1110 1000")
	.attr("preserveAspectRatio", "xMidYMid meet");