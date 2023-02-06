// unknown lwts store nay value regardless of type, but more restrictive than any

let userInput: unknown;
let userName: string;

userInput = 5;
userInput = "Max";

if (typeof userInput === "string") {
  userName = userInput;
}

// error function which throws never returns anything -> "returns" never

function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code };
}

generateError("An Error occured", 500);
