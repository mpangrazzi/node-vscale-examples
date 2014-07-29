var rpc = require('axon-rpc');
var axon = require('axon');
var rep = axon.socket('rep');

var fib = require('./fib');
var config = require('./config');
var times = config.times;

var server = new rpc.Server(rep);
rep.bind(4000);

var start;

server.expose('fib', function(i, callback) {
  if (i === 0) start = new Date().getTime();
  var f = fib(config.fibNumber);
  callback(null, i);
  if (i === times-1) console.log('Done %s in %s ms', times, new Date().getTime() - start);
});
