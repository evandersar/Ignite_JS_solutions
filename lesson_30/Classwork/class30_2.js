/*
###Задача 2 
Дополните код предыдущей задачи. Напишите middleware-функцию,
которая будет выводить в консоль путь и HTTP метод запроса.  
*/
var express = require('express');
var app = express(); 
var port = process.env.port || 1337; 

app.use(function(req, res, next){

	console.log('path : ' + req.path);
	console.log('method : ' + req.method);
	next(); // передать управление следующей функции middleware 
	
}); 

app.use(function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'}); 
	res.end('<h1>"Hello from Express"</h1>');  
}); 

app.listen(port, function() {
	console.log('App listening on port ' + port); 
}); 