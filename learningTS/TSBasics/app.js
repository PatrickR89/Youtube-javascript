"use strict";
// unknown lwts store nay value regardless of type, but more restrictive than any
let userInput;
let userName;
userInput = 5;
userInput = "Max";
if (typeof userInput === "string") {
    userName = userInput;
}
// error function which throws never returns anything -> "returns" never
function generateError(message, code) {
    throw { message: message, errorCode: code };
}
generateError("An Error occured", 500);
