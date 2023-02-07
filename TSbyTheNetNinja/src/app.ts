import { Invoice } from "./Classes/Invoice.js";

const inv = new Invoice("someone", "creating website", 300);

let invoices: Invoice[] = [];
invoices.push(inv);

const anchor = document.querySelector("a")!;

console.log(anchor.href);

const form = document.querySelector("form") as HTMLFormElement;
console.log(form.children);

const type = document.querySelector("#type") as HTMLSelectElement;
const toFrom = document.querySelector("#tofrom") as HTMLInputElement;
const details = document.querySelector("#details") as HTMLInputElement;
const amount = document.querySelector("#amount") as HTMLInputElement;

form.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  console.log(type.value, toFrom.value, details.value, amount.valueAsNumber);
});
