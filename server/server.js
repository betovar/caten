var http = require('http');
var url = require("url");

function onRequest(req, res) {
	console.log("Request received.");
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hello Caten World!\n')
  res.end();
}

http.createServer(onRequest).listen(8089);

console.log('Server running at http://localhost:8089');