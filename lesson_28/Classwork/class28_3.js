/*###Задача 3 
Напишите код, который создаст в текущей директории файл test с текстом, 
переданным в качестве аргумента командной строки. */
var fs = require('fs');

var str = '';
for (var i = 2; i < process.argv.length; i++) {
	str = str + ' ' + process.argv[i];
}
//console.log(str);

// асинхронное создание файла 
fs.writeFile('test.txt', str, function(err) { 
    if(err) {
        console.log(err)
    } 
});