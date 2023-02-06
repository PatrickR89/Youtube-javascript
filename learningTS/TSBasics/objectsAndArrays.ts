enum Role {
  ADMIN = 2,
  READ_ONLY = "Read-only",
  AUTHOR = 72
}

const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string]; // tuple
  availability: Role;
} = {
  name: "Maxi",
  age: 30,
  hobbies: ["sports", "cooking"],
  role: [2, "author"],
  availability: Role.READ_ONLY
};

let favouriteHobbies: string[];
favouriteHobbies = ["Sports"];

let something: any[];
// avoid any, use only for a fallback

for (const hobby in person.hobbies) {
  console.log(hobby.toUpperCase());
}

if (person.availability === Role.READ_ONLY) {
  console.log("read only");
}

person.role = [0, "admin"];

// push is an exception on tuples
