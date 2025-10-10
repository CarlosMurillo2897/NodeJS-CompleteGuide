// var it's considered an outdated syntax.
const name = "Carlos";
let age = 28;
const hasHobbies = true;

age = 30;

function summarizeUser(userName, userAge, userHasHobbies) {
  return `Name is ${userName}, age is ${userAge} and the user has hobbies: ${userHasHobbies}`;
}

console.log(summarizeUser(name, age, hasHobbies));