const character = "mario";

console.log(character);

const inputs = document.querySelectorAll("input");

inputs.forEach((input) => {
  console.log(input);
});

const circ = (diameter: number) => {
  return diameter * Math.PI;
};

const add = (a: number, b: number, c?: number, d: number = 10): number => {
  console.log(a + b);
  console.log(c);
  console.log(d);
  return a + b;
};

add(5, 10);

type StringOrNum = string | number;
type objWithName = { name: string; uid: StringOrNum };

const logDetails = (uid: StringOrNum, item: string): void => {
  console.log(`${item} has a uid of ${uid}`);
};

const greet = (user: objWithName) => {
  console.log(`${user.name} says hello`);
};

let greeting: (a: string, b: string) => void;

greeting = (name: string, greeting: string) => {
  console.log(`${name} says ${greeting}`);
};
