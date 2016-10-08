/*
###Задача 1 
Создайте HTTP сервер, который при обработке всех HTTP запросов создает подписанный cookie, 
доступный только для сервера со сроком жизни 1 неделя.  
*/
var express = require('express');
var http = require('http');
var app = express();

var port = process.env.port || 1337; 

// подключение модуля cookie-parser
var cookieParser = require('cookie-parser');

// если cookieParser принимает в качестве аргумента строку, она используется 
// для генерации  подписи cookie
app.use(cookieParser('this is a secret!!!'))

app.all('/', function (req, res) {

    res.cookie('cookie2', 'DemoSignedCookie', {
        expires: new Date(Date.now() + 604800000),
        httpOnly: true,
        // создание cookie с подписью 
        signed: true
    })

    // доступ к подписанным cookie через свойство req.signedCookies
    res.end(req.signedCookies.cookie2);

    res.on('end', function () {
        http.get('http://localhost:3000');
    })

    console.log('Cookies: ', req.signedCookies)
})

app.listen(port, function () {
    console.log('app running on port ' + port);
})