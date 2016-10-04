/*###Задача 3  
Загрузите модуль test.js из папки test(папка находится рядом с файлом с задачами) 3-мя разными способами. */
var test1 = require('./test/test.js');
test1.loger();
console.log('test1 loaded');

var test2 = require('./test');
test2.loger();
console.log('test2 loaded');

var test3 = require('test');
test3.loger();
console.log('test3 loaded');