/*
###Задача 2 
Дано массив users: 
```
users = [
{ name: 'Jane', age: 23 }, { name: 'John', age: 30 }, { name: 'Vasya', age: 25 },
{ name: 'Yvonne', age: 34 }, { name: 'Will', age: 18 }, {name: 'Jack', age: 26}
]
```
Реализуйте следующее: 
* При GET-запросе по пути /users массив users отображается на странице
 в виде списка(по свойству name). 
 При клике по каждому из элементов списка
 отправляется GET-запрос по пути /users/userID, где userID - свойство id массива users,
 соответствующее элементу списка.  
* При GET-запросе по пути /users/userID на странице отображается информация о соответствующем
пользователе - свойства элемента массива users - name и age. 
*/
var express = require('express'); 
var app = express(); 
var path = require('path')
var port = process.env.port || 1337; 

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

app.listen(port, function() {
	console.log('app listening on port ' + port); 
}); 