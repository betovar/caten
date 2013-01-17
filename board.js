var bd = d3.select("#board")
           .attr("width", 1010)
           .attr("height", 880);

bd.append("polygon")
	.attr("id", "ocean")
	.attr("points", "87,50 0,100 -87,50 -87,-50 0,-100 87,-50")
	.attr("transform", "translate(200,200) rotate(0)");

bd.append("polygon")
	.attr("id","house")
	.attr("opacity", "0")
	.attr("points", "20,-20 20,5 0,20 -20,5 -20,-20") 
	.attr("transform", "translate(287,250) rotate(180)");
bd.append("polygon")
	.attr("id","house")
	.attr("opacity", "0")
	.attr("points", "20,-20 20,5 0,20 -20,5 -20,-20") 
	.attr("transform", "translate(200,300) rotate(180)");
bd.append("polygon")
	.attr("id","house")
	.attr("opacity", "0")
	.attr("points", "20,-20 20,5 0,20 -20,5 -20,-20") 
	.attr("transform", "translate(113,150) rotate(180)");
bd.append("polygon")
	.attr("id","house")
	.attr("opacity", "0")
	.attr("points", "20,-20 20,5 0,20 -20,5 -20,-20") 
	.attr("transform", "translate(113,250) rotate(180)");
bd.append("polygon")
	.attr("id","house")
	.attr("opacity", "0")
	.attr("points", "20,-20 20,5 0,20 -20,5 -20,-20") 
	.attr("transform", "translate(200,100) rotate(180)");
bd.append("polygon")
	.attr("id","house")
	.attr("opacity", "0")
	.attr("points", "20,-20 20,5 0,20 -20,5 -20,-20") 
	.attr("transform", "translate(287,150) rotate(180)");