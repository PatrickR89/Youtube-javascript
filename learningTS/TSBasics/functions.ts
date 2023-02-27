// functions -> after colon return type can be defined

function add(n1: number, n2: number): number {
  return n1 + n2;
}

function printResult(num: number): void {
  console.log("Result: " + num);
}

printResult(add(5, 12));

// create a pointer to a function, give type of function to avoid non function types
let combineValues: Function;
combineValues = add;

// more precise function type definition

let secondCombo: (a: number, b: number) => number;
secondCombo = add;

console.log(combineValues(8, 8));

// define callback (closure)

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}

addAndHandle(10, 20, (result) => {
  console.log(result);
});
