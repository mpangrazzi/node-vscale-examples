var redis = require('redis').createClient();
var async = require('async');

var n = 1000;

function publish(i, callback) {
  var message = JSON.stringify({ payloadItem: i });
  redis.publish('queue', message, callback);
}

async.times(n, publish, function(err, res) {
  console.log('Done %s', n);
});
