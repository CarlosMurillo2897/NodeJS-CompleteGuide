// var it's considered an outdated syntax.
const userName = "Carlos";
let age = 28;
const hasHobbies = true;

age = 30;

const summarizeUser = (userName, userAge, userHasHobbies) => {
  return `Name is ${userName}, age is ${userAge} and the user has hobbies: ${userHasHobbies}`;
}

// const add = (a, b) => a + b;
// const addOne = a  => a + 1;
const addRandom = ()  => 2 + 3;

// console.log(add(2, 3));
// console.log(addOne(4));
console.log(addRandom());


console.log(summarizeUser(userName, age, hasHobbies));