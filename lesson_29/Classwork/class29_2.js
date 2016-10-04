/*
###Задача 2 
Модифицируйте код предыдущей задачи. Добавьте код, который отправляет GET запрос по пути '/test'.
*/

const http = require('http'); 
const port = process.env.port || 1337;

const server = http.createServer(); 

server.on('request', function(req, res) { 

	// request.method - возвращает http метод запроса(GET, PUT, etc.)
	// request.url - путь запроса 
	console.log(`  method: ${req.method}\n  path: ${req.url}\n `); 
	res.end('Page not found on this server!');

}); 

server.listen(port, function () {
    console.log('Server running on port ' + port); 

    // Создание запроса 
    // Параметры создаваемого запроса 
    var options = {
    	method: 'GET',
        host: 'localhost',
        port: port,
        path: '/test'
    }; 

    // Для создания запроса используется метод http.request(), который принимает в качестве аргумента объект конфигурации запроса
    var req = http.request(options);
    req.end(); 

    console.log('Sending GET request to /test\n');

});  