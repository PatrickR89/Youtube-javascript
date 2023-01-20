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

for (const hobby in person.hobbies) {
  console.log(hobby.toUpperCase());
}

person.role = [0, "admin"];

// push is an exception on tuples
