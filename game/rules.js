var EventEmitter = require('events').EventEmitter 
	, 

module.exports = new EventEmitter();

function roll() { 
  random.integers({ 
    "number": 2, 
    "minimum": 1, 
    "maximum": 6, 
    "base": 10 
  }, function(err, data) { 
    if (err) throw err; 
    console.log('%s', data); 
    module.exports.emit('rolled', data);
  }); 
}