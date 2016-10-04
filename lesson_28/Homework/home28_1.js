/*
###Задача 1 
Создайте EventEmitter, который каждую секунду будет генерировать событие 'tick'. 
Создайте функцию-обработчик события 'tick', которая будет выводить в консоль количество секунд,
прошедшее со времени генерации первого события 'Tick'. 
*/
'use strict'; 

// импорт модуля events
const events = require('events');

// создание экземпляра EventEmitter
const emitter = new events.EventEmitter; 

// назначение обработчика события 
let count = 0;
emitter.on('tick', () => {
    console.log(++count); 
}); 

// генерация события
setInterval(function() {
	emitter.emit('tick');
}, 1000);


