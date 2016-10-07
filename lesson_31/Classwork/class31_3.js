//###Задача 3 
//Добавьте в таблицу test_table базы данных test один элемент.  
var express  = require('express'); 
var app = express(); 

var port = process.env.port || 1337; 

var mysql = require('mysql'); 

// параметры соединеня с бд
var connection = mysql.createConnection({
	host: 'localhost', // имя хоста базы данных
	user: 'root', // MySQL пользователь, под именем которого авторизоваться
	password: '', // пароль пользователя MySQL 
	database: 'test_db', // имя базы данных 
	port: 3306 // порт, на котором установлен MySQL сервер
}); 

app.use(function(req, res) { 

	if (req.url == '/') {

		// подключение к базе данных
		connection.connect(function(err) { 

			if (err) console.log(err.stack); 

			 console.log('connected as id ' + connection.threadId);
		}); 

		// объект, который будет вставлен в базу данных
			var newItem = {
				id: 3, 
				name: 'Item 3',
				info: 'third item'
			}; 

			// кодирование данных с помощью функции pool.escape(); 
			var sql = 'INSERT INTO `test_table` (id, name, info) VALUES (' + escape(newItem.id) + ', ?, ?)'; 
			// альтернатива функции escape-использование '?' как placeholder и передача данных, которые должны быть 
			// использованы в запросе, в массиве в качестве аргумента функции query, следующего за строкой sql запроса 
			
			connection.query(sql, [newItem.name, newItem.info], function(err) {

				if (err) { 
					console.log(err); 
					return;  
				};

				console.log('data inserted!'); 
			});

	// метод query - отправка запроса к базе данных. Синтаксис: 
	// connection.query(sqlString, callback); Параметры: 
	// sqlString - команда SQL в виде строки 
	// callback - функция с аргументами: 
	//		err - ошибка (в случае, если она произошла)
	//		results - результат запроса 
	//		fields - информация про поля, полученные в результате запроса 
	connection.query('SELECT * FROM `test_table`', function(err, rows, fields) {
		res.writeHead(200, {'Content-Type': 'text/html'}); 
		res.write('<table border>'); 

		for (var i = 0; i < rows.length; i++) {
			res.write(`
				<tr>
					<td>${rows[i].id}</td>
					<td>${rows[i].name}</td>
					<td>${rows[i].info}</td>
				</tr>
			`)
		}; 

		res.write('</table>'); 
		res.end(); 
	})

		res.on('finish', function() {

			// отключение от базы данных 
			connection.end(function(err) {

				if (err) console.log(err.stack); 

				console.log('disconnected from database'); 
			}); 

		})

	}
}); 

app.listen(port, function() { 

	console.log('app listening on port ' + port); 

}); 