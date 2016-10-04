/*
###Задача 3 
Добавьте в код предыдущей задачи код для обработки GET запроса по пути '/test'. 
Ответом сервера на такой запрос должен быть JSON-объект '{"message": "Hello World!"}'. 
*/

const http = require('http'); 
const port = process.env.port || 1337;

const server = http.createServer(); 

server.on('request', function(req, res) { 

        if (req.url == '/test' && req.method == 'GET') {

           res.writeHead(200, { 'Content-Type': 'text/html' });
           res.end(JSON.stringify({message: "Hello World!"}));

           console.log(`  method: ${req.method}\n  path: ${req.url} `); 
           console.log('data sent!\n');
       }

        // request.method - возвращает http метод запроса(GET, PUT, etc.)
        // request.url - путь запроса 
        
        else {
            console.log(`  method: ${req.method}\n  path: ${req.url}\n `); 
            res.end('Page not found on this server!');
        }

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