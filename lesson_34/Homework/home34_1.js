/*
###Задача 1 
* Создайте Express сервер и подключите к нему модуль socket.io.  
* На стороне сервера создайте пространство имен с произвольным именем, 
которое генерирует событие 'message' и передает через событие объект {text: 'Hello from namespace'}.  
* На стороне клиента создайте обработчик события 'message', который выводит данные, 
переданные через событие, на экран и генерирует событие 'receive_message'. .
* На стороне сервера установите обработчик события 'receive_message', 
который выведет в консоль текст 'message received'. 
*/
// подключение express и socket.io 
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var path = require('path'); 

var port = process.env.port || 1337; 

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// пространства имен в socket.io создаются с помощью функции io.of('namespace_name') 
var namespace = io.of('/namespace'); 

// подключение к именному пространству socket.io 
namespace.on('connection', function (socket) {
    //console.log('connected to namespace');

    // генерация события message 
	namespace.emit('message', { text: 'Hello from namespace!' });

	socket.on('receive_message', function (data) {
	        console.log(data.response);
	    })
}) 

server.listen(port, function () {
    console.log('app running on port ' + port);
})