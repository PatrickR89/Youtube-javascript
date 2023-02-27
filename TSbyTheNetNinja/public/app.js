/*

// interface

interface IsPerson {
  name: string;
  age: number;
  speak(a: string): void;
  spend(a: number): number;
}

const me: IsPerson = {
  name: "shaun",
  age: 30,
  speak(text: string): void {
    console.log(text);
  },
  spend(amount: number): number {
    console.log("Spent: ", amount);
    return amount;
  }
};

const greetPerson = (person: IsPerson) => {
  console.log("hello ", person.name);
};

greetPerson(me);

// end of interfaces
*/
import { Invoice } from "./Classes/Invoice.js";
import { Payment } from "./Classes/Payment.js";
import { Position } from "./Enum/Position.js";
import { ListTemplate } from "./Classes/ListTemplate.js";
/*
let docOne: HasFormater;
let docTwo: HasFormater;

docOne = new Invoice("yoshi", "web work", 250);
docTwo = new Payment("luigi", "plumbing work", 150);

let docs: HasFormater[] = [];
docs.push(docOne);
docs.push(docTwo);

console.log(docs);

const inv = new Invoice("someone", "creating website", 300);

let invoices: Invoice[] = [];
invoices.push(inv);

const anchor = document.querySelector("a")!;

console.log(anchor.href);
*/
const form = document.querySelector("form");
const type = document.querySelector("#type");
const toFrom = document.querySelector("#tofrom");
const details = document.querySelector("#details");
const amount = document.querySelector("#amount");
const ul = document.querySelector("ul");
const list = new ListTemplate(ul);
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let values = [
        toFrom.value,
        details.value,
        amount.valueAsNumber
    ];
    let doc;
    if (type.value === "invoice") {
        doc = new Invoice(...values);
    }
    else {
        doc = new Payment(...values);
    }
    list.render(doc, type.value, Position.end);
});
/*

// GENERICS
// add <extends object> to avoid using function for basic types

const addUID = <T extends object>(obj: T) => {
  let uid = Math.floor(Math.random() * 100);
  return { ...obj, uid };
};

let docOne = addUID({ name: "yoshi", age: 40 });
console.log(docOne);

enum ResourceType {
  book,
  author,
  film,
  shopping,
  person
}
interface Resource<T> {
  uid: number;
  resourceName: ResourceType;
  data: T;
}

const docThree: Resource<object> = {
  uid: 1,
  resourceName: ResourceType.person,
  data: { name: "shaun" }
};

const docFour: Resource<string[]> = {
  uid: 2,
  resourceName: ResourceType.shopping,
  data: ["milk", "sugar", "salt"]
};

// tuples

let arr = ["ryu", 25, true]

let tup: [string, number, boolean] = ["ryu", 25, true]; // fixed types
let student: [string, number];
student = ["chun-li", 234]

*/
