/*
###Задача 2  
Создание простого чата. 

* Создайте Express сервер и подключите к нему модуль socket.io.   
* На стороне клиента создайте html страницу с полем ввода и кнопкой. 
* Если поле ввода не пустое, при нажатии на кнопку генерируется событие 'send_message', 
через событие передаются данные поля ввода. 
* На стороне сервера создайте обработчик события 'send_message'. Обработчик генерирует 
событие 'chat_message' и отсылает его всем подключенным клиентам. Через событие 'chat_message' 
передаются данные, полученные в событии 'send_message'. 
* На стороне клиента создайте обработчик события 'chat_message', 
который выводит на экран данные, переданные через событие. 
*/

// подключение express и socket.io 
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var path = require('path'); 

var port = process.env.port || 1337; 

// массив для хранения текущих подключений 
var connections = [];

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index2.html'));
});

// установка соединения
io.on('connection', function (socket) {

    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length); 

    // окончание соединения 
    socket.on('disconnect', function (data) {
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s sockets connected', connections.length); 
    })

    socket.on('send message', function (data) {
        // сгенерировать событие chat message и отправить его всем доступным подключениям 
        io.sockets.emit('chat message', data); 
    })
})

server.listen(port, function () {
    console.log('app running on port ' + port); 
})