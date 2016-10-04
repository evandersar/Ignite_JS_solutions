/*
###Задача 3 
Используя потоки(Streams) прочитайте с 10 по 20 байт файла test.txt и сохраните результат в файле output.txt.
*/

// Piping streams - перенаправление данных одного потока к другому потоку  

var fs = require("fs");

// создать поток для чтения данных
var readerStream = fs.createReadStream('test.txt', {start: 10, end:20});
//console.log(readerStream);

// создать поток для записи данных
var writerStream = fs.createWriteStream('output.txt');

// передача данных потока readerStream потоку writerStream 
readerStream.pipe(writerStream);

writerStream.on('finish', function () {
    console.log('data written to file output.txt')
});