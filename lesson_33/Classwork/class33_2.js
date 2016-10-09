/*
###Задача 2 
Дано массив users: 
```
users = [
{ name: 'Jane', age: 23 }, { name: 'John', age: 30 }, { name: 'Vasya', age: 25 },
{ name: 'Yvonne', age: 34 }, { name: 'Will', age: 18 }, {name: 'Jack', age: 26}
]
``` 
Реализуйте следующее: 
* При GET-запросе по пути '/users' в ответе сервера отправляется массив users в формате JSON. 
* При POST-запросе по пути '/users' в массив users добавляется элемент {name: 'random user', age: 30}.  
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
 
// обработчик ошибок 
server.on('InternalServer', function(err) {
    err.body = 'oops...error'; 
    res.send(err); 
})

server.listen(port, function () {
    console.log('server running on port ' + port);
});