var redis = require('redis').createClient();

var start;
var n = 1000;
var fibNumber = 30;

redis.subscribe('queue');

redis.on('message', function(channel, message) {
  var data = JSON.parse(message);

  if (data.payloadItem === 0) start = new Date().getTime();

  doWork(data.payloadItem, function(i, res, t) {
    console.log('Done %s: %s in %s ms', i, res, t);
    if (data.payloadItem === n-1) console.log('Total: %s ms', new Date().getTime() - start);
  });

});

function doWork(i, callback) {
  console.log('Processing %s', i);

  var e = new Date().getTime();
  var res = fib(fibNumber);
  e = new Date().getTime() - e;

  callback(i, res, e);
}

function fib(n) {
  return n < 2 ? 1 : fib(n-2) + fib(n-1);
}
