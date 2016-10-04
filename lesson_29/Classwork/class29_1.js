/*
###Задача 1 
Создайте HTTP сервер, который выводит в консоль HTTP метод запросв и путь, по которому был сделан запрос.
*/

const http = require('http'); 
const port = process.env.port || 1337;

const server = http.createServer(); 

server.on('request', function(req, res) { 

	// request.method - возвращает http метод запроса(GET, PUT, etc.)
	// request.url - путь запроса 
	console.log(`method: ${req.method} \n path: ${req.url} `); 
	res.end('Page not found on this server!');

}); 

server.listen(port); 
server.on('listening', function() {
	console.log('Server running on port ' + port); 
}); 