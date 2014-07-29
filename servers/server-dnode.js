var dnode = require('dnode');
var net = require('net');
var fib = require('../fib');

var config = require('../config');
var times = config.times;

var server = net.createServer(function(c) {

  var d = dnode({
    fib: function(i, cb) {
      if (i === 0) console.log('Start %s: %s', times, Date.now());
      cb(null, fib(config.fibNumber));
      if (i == config.times - 1) console.log('Done %s: %s', times, Date.now());
    }
  });

  c.pipe(d).pipe(c);

}).listen(4000);
