var w = 300;
var h = 100;
var barPadding = 1;

var dataset = [ 0, 2, 5, 4, 8, 10, 8, 5, 5, 6, 2 ];

var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("x", function(d, i) {
      return i * (w / dataset.length);
   })
   .attr("y", function(d) {
      return h - (d * 10);
   })
   .attr("width", w / dataset.length - barPadding)
   .attr("height", function(d) {
      return d * 10;
   })
   .attr("fill", "grey");

svg.selectAll("text")
   .data(dataset)
   .enter()
   .append("text")
   .text(function(d) {
      return d;
   })
   .attr("text-anchor", "middle")
   .attr("x", function(d, i) {
      return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
   })
   .attr("y", function(d) {
      return h - (d * 10) + 14;
   })
   .attr("font-family", "sans-serif")
   .attr("font-size", "11px")
   .attr("fill", "white");
