var redis = require('redis').createClient();
var computecluster = require('compute-cluster');

var config = require('./config');
var times = config.times;
var fibNumber = config.fibNumber;

var cc = new computecluster({
  module: '../fib-worker.js',
  max_backlog: -1,
});

var start;

redis.subscribe('queue');

redis.on('message', function(channel, message) {
  var data = JSON.parse(message);

  if (data.i === 0) start = new Date().getTime();

  cc.enqueue({ i: data.i, fibNumber: config.fibNumber }, function(err, result) {
    if (result.i === times-1) console.log('Done %s in %s ms', times, new Date().getTime() - start);
  });

});