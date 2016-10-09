/*###Задача 1 
Дано массив todos: 
```
todos = [
{ id: 1, name: 'Work', description: 'Stuff to do' }, 
{ id: 2, name: 'Walk the dog', description: 'Need to get up early' },
{ id: 3, name: 'Finish project', description: 'An important task' }, 
{ id: 4, name: 'Earn a lot of money', description: 'As soon as possible' },
{ id: 5, name: 'Go to sleep', description: 'late at night'}
]
``` 
Создайте приложение todoApp. 

Используя Restify, создайте REST API приложения с такой структурой: 
* /addItem - POST-запрос, создание нового элемента массива todos
* / - GET-запрос, показать все элементы массива todos в виде таблицы 
* /update/itemID - PUT-запрос, обновить элемент массива todos с указанным id. 
Тело запроса - в формате JSON. 
* /delete/itemID -DELETE-запрос, удалить элемент массива todos с указанным id 

На странице приложения должны находиться следующие элементы: 
* Таблица, в которой отображены элементы массива todos 
* 3 поля ввода с соответствующими названиями: id, name, description. 
* 3 кнопки с названиями: Add Item(Создать элемент), Delete Item(Удалить элемент),
Update Item(Обновить элемент), при нажатии на которые на сервер делаются AJAX-запросы
к REST API для выполнения соответствующих операций.

###Задача 2 
Модифицируйте код предыдущей задачи. Вместо массива todos для хранения данных используйте базу данных. 
*/ 
var restify = require('restify'); 

var http = require("http"),
    url = require("url"),
    path = require("path"), 
    fs = require('fs'); 

var port = process.env.port || 1337; 

// модуль для обработки запросов 
var apiHandler = require('./api_handler'); 

// создание сервера 
var server = restify.createServer({
    name: 'todoApp'
});

// middleware для обработки тела запроса 
server.use(restify.bodyParser({ mapParams: true }));

server.use(function(req, res, next) {

    console.log(req.method + ' ' + req.url); 
    next(); 
})

server.get('/', function (req, res) {
    fs.readFile(path.join(__dirname,'index.html'),"utf8", function(err, file) {
        if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.write(err + "\n");
            res.end();
            return;
        }

        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(file);
        res.end();
  })
})

// выбрать все элементы 
server.get('/api', apiHandler.loadItems);

// создать новый элемент 
server.post('/addItem', apiHandler.createItem);

// обновить элемент по ID 
server.put('/update/:itemID', apiHandler.updateItem);

// удалить элемент по ID 
server.del('/delete/:itemID', apiHandler.removeItem);  
 
// обработчик ошибок 
server.on('InternalServer', function(err) {
    err.body = 'oops...error'; 
    res.send(err); 
})

server.listen(port, function () {
    console.log('server running on port ' + port); 
});