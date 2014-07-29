function fib(n) {
  return n < 2 ? 1 : fib(n-2) + fib(n-1);
}

process.on('message', function(m) {
  var r = fib(m.fibNumber);
  process.send({ i: m.i, r: r });
});