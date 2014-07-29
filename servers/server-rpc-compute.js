var rpc = require('axon-rpc');
var axon = require('axon');
var rep = axon.socket('rep');
var computecluster = require('compute-cluster');

var config = require('../config');
var times = config.times;

var server = new rpc.Server(rep);
rep.bind(4000);

var cc = new computecluster({
  module: '../fib-worker.js',
  max_backlog: -1,
});

var start;

server.expose('fib', function(i, callback) {
  if (i === 0) start = new Date().getTime();

  cc.enqueue({ i: i, fibNumber: config.fibNumber }, function(err, result) {
    callback(err, result.r);
    if (result.i === times-1) console.log('Done %s in %s ms', times, new Date().getTime() - start);
  });

});
