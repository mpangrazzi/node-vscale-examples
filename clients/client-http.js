var request = require('request');
var async = require('async');

var config = require('../config');
var times = config.times;

function doRequest(i, callback) {

  request({
    url: 'http://127.0.0.1:1337',
    headers: {
      'i': i
    },
    pool: false
  }, callback);

}

async.times(times, doRequest, function(err, res) {
  console.log('Done %s', times);
  process.exit(0);
});