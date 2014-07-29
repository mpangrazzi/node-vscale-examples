module.exports = function fib(n) {
  return n < 2 ? 1 : fib(n-2) + fib(n-1);
}
