/*
###Задача 1 
Дополните код 3-й задачи предыдущего урока. Добавьте в приложение возможность удалять и редактировать элементы. 
Реализуйте следующее: 
* Добавьте на главную страницу приложения (страница, которая отображается при GET-запросе по пути '/'),
 поле ввода(для ввода id элемента) и 2 кнопки(Delete Item и Edit Item). 

* Если поле ввода не пустое, при нажатии на кнопку Delete Item осуществляется поиск в базе данных
 элемента по указанному в поле ввода ID и, в случае, если элемент найден, его удаление. 

* Если поле ввода не пустое, при нажатии на кнопку Edit Item осуществляется поиск в базе данных элемента
 по указанному в поле ввода ID и, в случае, если элемент найден, переход по пути '/editItem' 
 и загрузка страницы редактирования элемента. 

* На странице редактирования элемента находятся 2 поля ввода: name и info и кнопка Apply. 

* Если поля ввода name и info не пустые, при нажатии на кнопку Apply осуществляется обновление элемента в базе данных. 

* После обновления или удаления элемента происходит перенаправление на главную страницу приложения. 
*/
var express  = require('express'); 
var app = express(); 
var mysql = require('mysql'); 
var path = require('path')
var port = process.env.port || 1337; 
var bodyParser = require('body-parser');
var http = require('http');

var jsonParser = bodyParser.json();
var textParser = bodyParser.text(); 

app.use(jsonParser); 
app.use(textParser);

// установка генератора шаблонов 
app.set('views', './public'); 
app.set('view engine', 'ejs');

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

				 // генерация рядов таблицы на основе полученных данных  
	            var table_rows = rows.map((row) => {
	                return (` <tr>
	                            <td>${row.id} </td>
	                            <td>${row.name}</td>
	                            <td>${row.info}</td>
	                        </tr> `)
	            })

	            table_rows.join(' ');

	            res.render('index', { data:  table_rows});
                conn.release(); 

			});
	}); 
}); 

app.delete('/:id', function(req, res) { 
	console.log('deleting items'); 

	// подключение к бд
        pool.getConnection(function (err, conn) {
            // запрос к бд 
            var sql = 'DELETE FROM `test_table` WHERE id=?';
			
        	sql = mysql.format(sql, req.params.id);
			
			conn.query(sql, function(err) {

				if (err) { 
					console.log(err); 
					return;  
				};

				console.log('data deleted!'); 
			});

			// завершение соединения 
            conn.release();
            res.end();
        })

}); 

app.get('/addItem', function(req, res) {
		console.log('adding items'); 
		//res.redirect('/');
		res.sendFile(path.join(__dirname,'/public/add_item.html'));
}); 

app.get('/editItem/:id', function(req, res) {
		console.log('editing items'); 
		// подключение к бд
        pool.getConnection(function (err, connection) {
            // запрос к бд 
             var sql ='SELECT * FROM `test_table` WHERE id=?';
			// альтернатива функции escape-использование '?' как placeholder и передача данных, которые должны быть 
			// использованы в запросе, в массиве в качестве аргумента функции query, следующего за строкой sql запроса 
			
			connection.query(sql, [req.params.id], function(err, rows) {

				if (err) { 
					console.log(err); 
					return;  
				};

				res.render('edit_item_page', {
                    id: rows[0].id,
                    name: rows[0].name,
                    info: rows[0].info
                });
                //console.log(rows[0].id);

				connection.release(); 
			});

			
        })
}); 

app.put('/editItem', function(req, res) {
		console.log('updating item'); 
		var data = req.body;
		pool.getConnection(function(err, conn){ 

			if (err) {
				console.log(err.stack); 
				return; 
			}

			// форматирование запроса
	        var sql = 'UPDATE `test_table` SET name=?, info=? WHERE id=?';
	        var inserts = [data.name, data.info, data.id];
	        sql = mysql.format(sql, inserts);
			
			conn.query(sql, function(err) {

				if (err) { 
					console.log(err); 
					return;  
				};

				console.log('data inserted!'); 
			});

			// закончить соединение, позволить ему быть использованным еще раз
			conn.release(); 
		}); 
});

// обработка POST запросов по пути '/addItem'
app.post('/addItem', function(req, res) { 
	// чтение данных POST запроса 
	var data = req.body.text.split(';');
	var data1 = data[0]; 
	var data2 = data[1]; 
	
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
			});

			// закончить соединение, позволить ему быть использованным еще раз
			conn.release(); 
		}); 
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


