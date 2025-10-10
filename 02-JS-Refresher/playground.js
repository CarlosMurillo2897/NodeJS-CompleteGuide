// A key-value pair is also called a property or a field of the object.
const person = {
    name: 'Carlos',
    age: 28,
    // In this case, this.name referes to a global scope instead of current function scope.
    // greet: () => {
    greet: function () {
        console.log(`Hi, I am ${this.name}.`);    
    },
    alsoGreet() {
        console.log(`Hi, I am ${this.name}.`);    
    }
};

person.greet();
person.alsoGreet();