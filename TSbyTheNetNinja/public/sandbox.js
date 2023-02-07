"use strict";
const character = "mario";
console.log(character);
const inputs = document.querySelectorAll("input");
inputs.forEach((input) => {
    console.log(input);
});
const circ = (diameter) => {
    return diameter * Math.PI;
};
const add = (a, b, c, d = 10) => {
    console.log(a + b);
    console.log(c);
    console.log(d);
    return a + b;
};
add(5, 10);
const logDetails = (uid, item) => {
    console.log(`${item} has a uid of ${uid}`);
};
const greet = (user) => {
    console.log(`${user.name} says hello`);
};
let greeting;
greeting = (name, greeting) => {
    console.log(`${name} says ${greeting}`);
};
