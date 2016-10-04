/*
###Задача 2 
Рядом с файлом с задачами в папке Homework находится файл test.txt. 
Напишите код, который выведет в консоль с 10 по 15 байт этого файла. 
*/
var fs = require('fs');
// асинхронное чтение из файла 
    fs.readFile('test.txt', { encoding: 'utf-8' }, function (err, data) {
        if (err) {
            console.log(err)
        }
        else {
            //console.log(typeof(data))
            var buf = Buffer.from(data.slice(10, 16));
            console.log(buf);
            console.log('buffer from string: ' + buf.toString());
        }
    }); 