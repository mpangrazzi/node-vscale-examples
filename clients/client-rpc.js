var rpc = require('axon-rpc');
var axon = require('axon');
var req = axon.socket('req');
var async = require('async');

var config = require('../config');
var times = config.times;

var client = new rpc.Client(req);
req.connect(4000);

function callFib(i, callback) {
  client.call('fib', i, callback);
}

async.times(times, callFib, function(err, res) {
  console.log('Done %s', times);
  process.exit(0);
});
