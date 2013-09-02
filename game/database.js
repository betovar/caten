var redis = require('redis');
var database = redis.createClient(6379, process.env.REDIS_HOST);

database.auth(process.env.REDIS_PASS, function (err) {
  if (err) { throw err; }
});

database.on('ready', function () {
	console.log('database is ready');
	//database.info(function (err, reply) { console.log(reply); });
});
