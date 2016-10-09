/*
###Задача 1 
Создайте базовый сервер с помощью Restify. Реализуйте следующее: 
* При GET-запросе по пути '/test' на странице отображаются заголовки запроса.
* При POST-запросе по пути '/test' на странице отображается тело запроса.
*/
var restify = require('restify'),
    fs = require('fs'); 

var port = process.env.port || 1337; 

// создание сервера 
var server = restify.createServer({
    name: 'myApp'
});

// обработка get запроса 
server.get('/test', function (req, res, next) {
    res.send('This is a server created with restify GET! ' + JSON.stringify(req.headers));

});
 
// обработка post запроса 
server.post('/test', function (req, res, next) {
    res.send('This is a server created with restify POST! ' + req.body);

});

server.use(function () {
    res.send(404); 
})

server.listen(port, function () {
    console.log('server running on port ' + port); 
});