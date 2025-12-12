const contact1 = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "123-456-7890",
  "favorite color": "blue", // Property name with a SPACE

  displayInfo() {
    console.log(`Name: ${this.firstName} ${this.lastName}`);
    console.log(`Email: ${this.email}`);
    console.log(`Phone: ${this.phone}`);
    console.log(`Favorite Color: ${this["favorite color"]}`);
  },
};

const contact2 = {
  firstName: "Jane",
  lastName: "Smith",
  email: "jane.smith@gmail.com",
  phone: "555-5678",
};

const contact3 = {
  firstName: "Bob",
  lastName: "Johnson",
  email: "bob.j@yahoo.com",
  phone: "555-9999",
};

const contacts = [contact1, contact2, contact3];

console.log("Total contacts:", contacts.length);
console.log("First contact:", contacts[0].firstName);
console.log("All contacts:", contacts);

console.log("\n --- Looping through contacts ---");

// Method 1: for...of loop (modern, clean)
console.log("Using for...of:");
for (const contact of contacts) {
  console.log(`${contact.firstName} ${contact.lastName} - ${contact.email}`);
}

// Method 2: forEach (functional approach)
console.log("\nUsing forEach:");
contacts.forEach((contact) => {
  console.log(`${contact.firstName} ${contact.lastName} - ${contact.email}`);
});

// Method 3: Traditional for loop (when you need index)
console.log("\nUsing traditional for loop:");
for (let i = 0; i < contacts.length; i++) {
  console.log(`Contact ${i + 1}: ${contacts[i].firstName}`);
}
