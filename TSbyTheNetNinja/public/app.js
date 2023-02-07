import { Invoice } from "./Classes/Invoice.js";
const inv = new Invoice("someone", "creating website", 300);
let invoices = [];
invoices.push(inv);
const anchor = document.querySelector("a");
console.log(anchor.href);
const form = document.querySelector("form");
console.log(form.children);
const type = document.querySelector("#type");
const toFrom = document.querySelector("#tofrom");
const details = document.querySelector("#details");
const amount = document.querySelector("#amount");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(type.value, toFrom.value, details.value, amount.valueAsNumber);
});
