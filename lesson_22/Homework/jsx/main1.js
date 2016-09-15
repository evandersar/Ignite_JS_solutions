'use strict';

class Person {

    constructor(firstName = "John", lastName = "Doe", age = 0, gender = "Male") {
        this.firstName = firstName; 
        this.lastName =  lastName;
        this.age = age;
        this.gender = gender;
    }

    fullName(){
        return `${this.firstName} ${this.lastName}`;
    }
    
    sayHi() {
        alert("Hello, my  name is " + this.fullName());
    }
}


let user1 = new Person("Вася");
user1.sayHi(); // Вася