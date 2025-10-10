// A key-value pair is also called a property or a field of the object.
const person = {
    name: 'Carlos',
    age: 28,
    // In this case, this.name referes to a global scope instead of current function scope.
    // greet: () => {
    greet() {
        console.log(`Hi, I am ${this.name}.`);    
    }
};

const hobbies = [ 'Sports', 'Cooking' ];
// for (let hobby of hobbies) {
//     console.log(hobby);
// }

// Map: Transform into a new array by inputing a function on how to transform each element.
// console.log(hobbies.map(hobby => 'Hobby: ' + hobby));
// console.log(hobbies);

// A Reference type mofification.
hobbies.push('Programming');
console.log(hobbies);