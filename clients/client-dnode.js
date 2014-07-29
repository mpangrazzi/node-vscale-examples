var dnode = require('dnode');
var net = require('net');
var async = require('async');

var config = require('../config');
var times = config.times;

var d = dnode.connect(4000);

d.on('remote', function (remote) {

  async.times(times, remote.fib, function(err, res) {
    console.log('Done %s', times);
    d.end();
    process.exit(0);
  });

});
