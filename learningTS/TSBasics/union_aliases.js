"use strict";
// typealias
// union types
function add(n1, n2, resultConversion) {
    let result;
    if (typeof n1 === "number" && typeof n2 === "number") {
        result = n1 + n2;
    }
    else {
        result = n1.toString() + n2.toString();
    }
    if (resultConversion === "as-number") {
        return parseFloat(result);
    }
    else if (resultConversion === "as-text") {
        return result.toString();
    }
    return result;
}
const combinedAges = add(30, 24, "as-number");
const combinedNames = add("Max", "Anna", "as-text");
console.log(combinedAges);
