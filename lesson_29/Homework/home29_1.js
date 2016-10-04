/*
###Задача 1 
Создайте HTTP сервер, который записывает заголовки каждого запроса в отдельный файл.
При обработке каждого запроса должен создаваться отдельный файл,
 имя которого - номер запроса(1 - для первого запроса, 2 - для второго и т.д.).
*/
const http = require('http'); 
const port = process.env.port || 1337; 
const fs = require('fs');

var count = 1;

const server = http.createServer((req, res) => {

    var headers = req.headers;

    var body = '';
    for (var prop in headers) {
        body += `${prop}: ${headers[prop]}\n`;
    }
    
    // асинхронное создание файла 
	fs.writeFile(`${count}.txt`, body, function(err) { 
	    if(err) {
	        console.log(err)
	    } 
	    console.log('Data saved');
	});

	count++;

    res.end(); // метод end сигнализирует о завершении создания ответа 
    	
});

server.listen(port); 

console.log('server running on port ' + port); 