/*###Задача 2 
Создайте пустой(неинициализированный) буфер длиной 100 байт, заполните его байтами 
со значениями от 0 до 99 и выведите в консоль его содержимое.  */

// Метод Buffer.alloc - создает неинициализированный буфер на указанное количество байт
const buf = Buffer.alloc(100);

for (var i = 0; i < buf.length; i++) {
	buf.write(i.toString(), i, 2);
	//console.log(i);
}

//console.log(buf.length);
console.log(buf);
console.log(buf.toString());




