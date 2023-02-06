"use strict";
function add(n1, n2, showResult, resultPhrase) {
    console.log(typeof n1);
    if (showResult) {
        console.log(resultPhrase, n1 + n2);
    }
    else {
        return n1 + n2;
    }
}
const number1 = 5;
const number2 = 2.6;
const printResult = true;
const resultPhrase = "Result is: ";
console.log(add(number1, number2, printResult, resultPhrase));
