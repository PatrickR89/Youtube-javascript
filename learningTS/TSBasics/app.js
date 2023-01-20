var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["READ_ONLY"] = 1] = "READ_ONLY";
    Role[Role["AUTHOR"] = 2] = "AUTHOR";
})(Role || (Role = {}));
var person = {
    name: "Maxi",
    age: 30,
    hobbies: ["sports", "cooking"],
    role: [2, "author"],
    availability: Role.READ_ONLY
};
for (var hobby in person.hobbies) {
    console.log(hobby.toUpperCase());
}
person.role = [0, "admin"];
// push is an exception on tuples
