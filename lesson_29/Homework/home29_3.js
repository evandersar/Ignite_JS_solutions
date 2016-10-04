/*
###Задача 3 
Добавьте в код предыдущих задач обработку ошибок: при запросе по несуществующему 
пути(все пути, кроме '/' и '/test'(с POST запросом)) 
на экран должно выводиться сообщение об ошибке, а статус-код ответа сервера должен быть 404. 
*/
const http = require('http'); 
const port = process.env.port || 1337; 
const fs = require('fs');
const url = require('url');
const path = require('path'); 

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

    if (req.url == "/") {

            // чтение файла index.html
            var file_path = path.join(__dirname, 'index.html');
            fs.readFile(file_path, function (err, data) { 

                // обработка ошибок
                if (err) {

                    console.log(err);
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.write('Not Found!');

                } else {

                    res.writeHead(200, { 'Content-Type': 'text/html' }); 
                    // записать в овет содержимое читаемого файла 
                    res.write(data.toString());

                }

                res.end();
            })

        } else if (req.url == "/test" && req.method == 'POST') {

            var body = ''; 

            // получение данных POST запроса 
            req.on('data', function (data) {

                body = data.toString(); 

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(JSON.stringify({message: body}));

                console.log('data sent!');

        });

    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('Resource not found'); 
    }
    	
});

server.listen(port); 

console.log('server running on port ' + port); 