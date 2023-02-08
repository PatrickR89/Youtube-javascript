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
    let doc;
    if (type.value === "invoice") {
        doc = new Invoice(toFrom.value, details.value, amount.valueAsNumber);
    }
    else {
        doc = new Payment(toFrom.value, details.value, amount.valueAsNumber);
    }
    list.render(doc, type.value, Position.end);
});
