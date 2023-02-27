"use strict";
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 2] = "ADMIN";
    Role["READ_ONLY"] = "Read-only";
    Role[Role["AUTHOR"] = 72] = "AUTHOR";
})(Role || (Role = {}));
const person = {
    name: "Maxi",
    age: 30,
    hobbies: ["sports", "cooking"],
    role: [2, "author"],
    availability: Role.READ_ONLY
};
let favouriteHobbies;
favouriteHobbies = ["Sports"];
let something;
// avoid any, use only for a fallback
for (const hobby in person.hobbies) {
    console.log(hobby.toUpperCase());
}
if (person.availability === Role.READ_ONLY) {
    console.log("read only");
}
person.role = [0, "admin"];
// push is an exception on tuples
