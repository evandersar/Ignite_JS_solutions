//###Задача 1 
//Напишите код, который выводит в консоль сумму аргументов, переданных в командной строке при запуске файла. 

var sum = 0;
for (var i = 2; i < process.argv.length; i++) {
	sum += +process.argv[i];
}

console.log(`Sum is: ${sum}`); 