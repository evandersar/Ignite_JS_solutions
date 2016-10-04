/*
Дополните код предыдущей задачи. Добавьте 2 middleware-функции: 
* функция для обработки GET запроса по пути '/test'. Функция должна возвращать html страницу с полем ввода и кнопкой.
 Если поле ввода не пустое, при нажатии на кнопку создается POST запрос по пути '/test'. Тело запроса - текст поля ввода.  
* функция для обработки POST запроса по пути '/test'. Функция выводит на экран тело запроса. 
*/
var express = require('express');
var app = express(); 
var path = require('path'); 
var port = process.env.port || 1337; 
var bodyParser = require('body-parser');

// middleware для обработки тела запроса в кодировке urlencoded 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(function(req, res, next){

	console.log('path : ' + req.path);
	console.log('method : ' + req.method);
	next(); // передать управление следующей функции middleware 
	
}); 

// обработка GET запросов по пути '/test'
app.get('/test', function(req, res) { 
	
	res.sendFile(path.join(__dirname,'/public/index.html'));
}); 

// обработка POST запросов по пути '/test'
app.post('/test', function(req, res) { 
	// чтение данных POST запроса 
	var data = req.body.text; 
	res.writeHead(200, {'Content-Type':'text/html'}); 
	res.end(data); 
});

app.use(function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'}); 
	res.end('<h1>"Hello from Express"</h1>');  
}); 

app.listen(port, function() {
	console.log('App listening on port ' + port); 
}); 