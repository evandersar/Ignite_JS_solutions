/*
###Задача 2 
Дополните код предыдущей задачи. Реализуйте следующее: 
* При GET-запросе по пути '/addItem' открывается html страница
 с 2 полями ввода(name, info) и кнопкой. 
* Если поля ввода(или одно из полей ввода) не пустые, при нажатии на кнопку
 выполняется добавление нового элемента в базу данных
 (данные полей ввода сохраняются в соответсвующих колонках таблицы базы данных). 
* После завершения запроса для добавления элемента в базу данных происходит редирект
 на главную страницу(GET-запрос по пути '/'). 
*/
var express  = require('express'); 
var app = express(); 
var mysql = require('mysql'); 
var path = require('path')
var port = process.env.port || 1337; 
var bodyParser = require('body-parser');

// middleware для обработки тела запроса в кодировке urlencoded 
app.use(bodyParser.urlencoded({ extended: true })); 

// соединения могут быть объединены для облегчения их многократного использования 
// или использования больщого количесва соединений  
var pool = mysql.createPool({
	host: 'localhost', 
	user: 'root', 
	password: '', 
	database: 'test_db'
});  

app.get('/', function(req, res) { 
	// создать соединение
	pool.getConnection(function(err, conn) {

			console.log('another connection'); 

			conn.query('SELECT * FROM `test_table`', function(err, rows) {
				if (err) console.log(err); 

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

			// закончить соединение, позволить ему быть использованным еще раз
			conn.release(); 

			// метод pool.end закрывает все соединения 
			/*pool.end(function(err) {
					console.log('pool closed'); 
				})*/

			});
	}); 
}); 

app.get('/addItem', function(req, res) {
		console.log('adding items'); 
		//res.redirect('/');
		res.sendFile(path.join(__dirname,'/public/index.html'));
}); 

// обработка POST запросов по пути '/addItem'
app.post('/addItem', function(req, res) { 
	// чтение данных POST запроса 
	var data = req.body.text.split(';');
	var data1 = data[0]; 
	var data2 = data[1]; 
	//res.writeHead(200, {'Content-Type':'text/html'}); 
	//res.end(data1 +'<br/>'+ data2); 
	var newItem = { 
				name: data1,
				info: data2
			}; 

	pool.getConnection(function(err, conn){ 

			if (err) {
				console.log(err.stack); 
				return; 
			}
 
			var sql = 'INSERT INTO `test_table` (name, info) VALUES ( ?, ?)';
			// альтернатива функции escape-использование '?' как placeholder и передача данных, которые должны быть 
			// использованы в запросе, в массиве в качестве аргумента функции query, следующего за строкой sql запроса 
			
			conn.query(sql, [newItem.name, newItem.info], function(err) {

				if (err) { 
					console.log(err); 
					return;  
				};

				console.log('data inserted!'); 
			})
			/*.on('end', function() {
				res.redirect('/'); 
			});*/

			// метод pool.end закрывает все соединения 
			/*pool.end(function(err) {
					console.log('pool closed'); 
				})*/

			// закончить соединение, позволить ему быть использованным еще раз
			conn.release(); 
		}); 
	//res.redirect('/');
});

// событие connection генерируется при установлении подключения 
pool.on('connection', function() {
	console.log('connected');  
}); 

// событие enqueue генерируется, когда в очереди обработки есть соединения, ожидающие подключения
pool.on('enqueue', function() {
	console.log('waiting for connection'); 
}); 

app.listen(port, function() { 
	console.log('app listening on port ' + port); 
}); 


