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

contact1.displayInfo();
console.log("Keys:", Object.keys(contact1));
console.log("Values:", Object.values(contact1));
console.log("Entries:", Object.entries(contact1));

console.log("\n--- Object.assign() ---");

// Create a shallow copy of the contact1 object
const contact2 = Object.assign({}, contact1);
contact2.firstName = "Jane";

console.log("Original:", contact1.firstName);
console.log("Copy:", contact2.firstName);

// Merge objects
const additionalInfo = { age: 30, city: "New York" };
const fullContact = Object.assign({}, contact1, additionalInfo);

console.log("Merged Contact:", fullContact);
