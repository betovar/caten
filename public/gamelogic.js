var socket = io.connect(),
	gameid = document.URL.split("/")[4];

socket.of('game').on('connect', function() {
	socket.of('game').emit('join', gameid);
});

socket.of('game').in(gameid).on('joined', function(data) {
	console.log(data);
	for (var d in data) {
		if (data.hasOwnProperty(d)) {
			$('#'+data[d].profile+' span:first')
			.text(data[d].username)
			.addClass(data[d].style);
		}
	}
});

socket.of('game').in(gameid).on('message', function(data) {
	console.log(data);
});


$('#devcards').popover({
    html: "true",
    trigger: "click",
    title: "Development Cards",
    placement: function() {
    	return 'bottom';
    },
    content: function() {
    	return '<i class="icon-star"> </i>';
    }
});
$('body').tooltip({
	toggle: "tooltip",
	placement: "bottom",
	html: "true",
	trigger: "click hover",
	container: 'northwest',
    title: function() {
    	return '<i class="icon-star"></i><i class="icon-star"></i>';
    }
});

socket.of('game').in(gameid).on('start', function(data) {
//render all hexes
	var hexes = d3.select("#hexes").selectAll("g")
		.data(data.grid)
		.enter()
		.append("g")
		.attr("class", function(d) { return d.resource; });
	hexes.append("polygon")
		.attr("class", "hex")
		.attr("points", data.shapes.hex);
// with chits, numbers, and dots
	hexes.append("circle")
		.attr("class", "chit")
		.attr("r", 30);
	hexes.append("text")
		.attr("y", -5)
		.text(function(d) { return d.chit; })
		.style("stroke", function(d) { return d.color });
	var dots = [".....", "....", "...", "..", "."];
	hexes.append("text")
		.attr("y", 5)
		.text(function(d) { return dots[Math.abs(d.chit-7)-1]	})
		.style("stroke", function(d) { return d.color });
//remove chits on desert hex
	hexes.select(".desert circle").remove();
	hexes.selectAll(".desert text").remove();
//tranisition hexes in an explosion pattern
	hexes.transition()
		.attr("transform", function(d) { return "translate("+d.x+","+d.y+")"; })
		.duration(2000);
//render all ports
	setTimeout( function() {
		var ports = d3.select("#ports").selectAll("g")
			.data(data.ports)
			.enter()
			.append("g")
			.attr("class", function(d) { return d.flavor+" harbor"; });
		var p = data.shapes.port;
		ports.append("circle")
			.attr("cx", p.cir.cx)
			.attr("r", p.cir.r);
		var ctrrot = (p.cir.cx+p.cir.r)
		, offset = (ctrrot-p.rec.w/2);
		ports.append("rect")
			.attr("x", offset)
			.attr("y", p.rec.y)
			.attr("width", p.rec.w)
			.attr("height", p.rec.h)
			.attr("rx", p.rec.rx)
			.attr("transform", function(d) {
				return "rotate("+(-1*d.angle)+", "+ctrrot+",0)"
			});
		ports.append("text")
			.attr("x", ctrrot)
			.attr("transform", function(d) {
				return "rotate("+(-1*d.angle)+", "+ctrrot+",0)"
			})
			.text(function(d) {
				if (d.flavor === "generic") { return "3:1"; }
				else { return "2:1"; }
			});
		ports.transition()
			.attr("transform", function(d) {
				return "translate("+d.x+","+d.y+") rotate("+d.angle+")";
			})
			.duration(1000);
		}, 2000);
});

function roll() {
	socket.in(gameid).emit('roll');
}

function buy(item) {
	socket.in(gameid).emit('buy', item );
}

function offer(cards) {
	socket.in(gameid).emit('offer', cards );
}

function pass() {
	socket.in(gameid).emit('pass');
}