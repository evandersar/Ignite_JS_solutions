/*
###Задача 3 
Модифицируйте код предыдущией задачи. Добавьте в код middleware-функцию для обработки ошибок.
*/
var express = require('express'); 
var app = express(); 
var path = require('path')
var port = process.env.port || 1337; 

app.get('/', function(req, res) {
		console.log('home'); 
		res.redirect('/users');
}); 

app.get('/users', function(req, res) {
		console.log('users'); 
		res.sendFile(path.join(__dirname,'/public/view.html'));
}); 

app.get('/users/:userID', function(req, res) {
		console.log('users with param!'); 
		// доступ к параметрам маршрутизации осуществляется через объект req.params 
		console.log(req.params.userID);
		res.end(req.params.userID); 
}); 

app.use(function(req, res) {
	res.writeHead(404, {'Content-Type': 'text/plain'}); 
	res.end('404 Page not found!');  
}); 

app.listen(port, function() {
	console.log('app listening on port ' + port); 
}); 