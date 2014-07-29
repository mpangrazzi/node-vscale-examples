var redis = require('redis').createClient();

var config = require('../config');
var times = config.times;
var fibNumber = config.fibNumber;
var fib = require('../fib');

var start;

redis.subscribe('queue');

redis.on('message', function(channel, message) {
  var data = JSON.parse(message);

  if (data.i === 0) start = new Date().getTime();

  doWork(data.i, function(i, res, t) {
    // console.log('Done %s: %s in %s ms', i, res, t);
    if (data.i === times-1) console.log('Done %s in %s ms', times, new Date().getTime() - start);
  });

});

function doWork(i, callback) {
  // console.log('Processing %s', i);

  var e = new Date().getTime();
  var res = fib(fibNumber);
  e = new Date().getTime() - e;

  callback(i, res, e);
}
