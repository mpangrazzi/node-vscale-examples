var redis = require('redis').createClient();
var async = require('async');

var config = require('../config');
var times = config.times;

function publish(i, callback) {
  var message = JSON.stringify({ i: i });
  redis.publish('queue', message, callback);
}

async.times(times, publish, function(err, res) {
  console.log('Done %s', times);
  process.exit(0);
});
