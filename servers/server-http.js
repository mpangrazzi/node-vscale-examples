var http = require('http');
var fib = require('../fib');

var config = require('../config');
var times = config.times;

var start;

http.createServer(function (req, res) {
  if (req.headers['i'] == 0) console.log('Start %s: %s', times, Date.now());

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(fib(config.fibNumber) + '\n');

  if (req.headers['i'] == config.times-1) console.log('Done %s: %s', times, Date.now());
}).listen(1337, '127.0.0.1');