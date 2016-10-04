var counter1 = require('./A');
var counter2 = require('./A');

var c1 = counter1.counter(1);
var c2 = counter2.counter(2);

console.log(c1.count);
console.log(c2.count); 