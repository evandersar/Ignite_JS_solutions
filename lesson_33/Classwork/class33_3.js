/*
###Задача 3 
Модифицируйте код предыдущей задачи. Реализуйте следующее: 
* При PUT-запросе по пути '/users/index', где index - индекс элемента в массиве users, 
элемент по указанному индексу заменяется на следующий объект: {name: 'updated name', age: 'updated age'}. 
* При DELETE-запросе по пути '/users/index', где index - индекс элемента в массиве users, 
происходит удаление элемента с указанным индексом из массива.   
*/
var users = [
{ name: 'Jane', age: 23 }, { name: 'John', age: 30 }, { name: 'Vasya', age: 25 },
{ name: 'Yvonne', age: 34 }, { name: 'Will', age: 18 }, {name: 'Jack', age: 26}
];

var restify = require('restify'),
    fs = require('fs'); 

var port = process.env.port || 1337; 

// создание сервера 
var server = restify.createServer({
    name: 'myApp'
});

server.use(function(req, res, next) {

    console.log(req.method + ' ' + req.url); 
    next(); 
})

server.get('/users', function (req, res) {
    res.send(JSON.stringify(users));
}) 

server.post('/users', function (req, res) {
	users.push({name: 'random user', age: 30});
	res.send('element added into users array');
}) 

server.put('/users/:index', function (req, res) {
    users[req.params.index] = {name: 'updated name', age: 'updated age'};
    res.send('element in users array updated');
}) 

server.del('/users/:index', function (req, res) {
    users.splice(req.params.index, 1);
    res.send('element removed from users array');
}) 
 
// обработчик ошибок 
server.on('InternalServer', function(err) {
    err.body = 'oops...error'; 
    res.send(err); 
})

server.listen(port, function () {
    console.log('server running on port ' + port);
});