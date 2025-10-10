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

const copiedPerson = {...person};
console.log(copiedPerson);

// Rest operator: Collects multiple elements and condenses them into an array.
const toArray = (...args) => args;
console.log(toArray(1, 2, 3, 4));

const hobbies = [ 'Sports', 'Cooking' ];
// for (let hobby of hobbies) {
//     console.log(hobby);
// }

// Map: Transform into a new array by inputing a function on how to transform each element.
// console.log(hobbies.map(hobby => 'Hobby: ' + hobby));
// console.log(hobbies);

// A Reference type mofification.
// hobbies.push('Programming');
// console.log(hobbies);

// Copy an array.
// const copiedArray = hobbies.slice();

// Array inside an array.
// const copiedArray = [hobbies];

// Spread Operator: Pull out all props, items and spread it.
const copiedArray = [...hobbies]; 

console.log(copiedArray);
