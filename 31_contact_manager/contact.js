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

console.log("\n --- map() Method ---");

// Extract just the first names
const firstNames = contacts.map((contact) => contact.firstName);
console.log("First names:", firstNames);

// Extract full name strings
const fullNames = contacts.map(
  (contact) => `${contact.firstName} ${contact.lastName}`
);
console.log("Full names:", fullNames);

// Transform to email domains
const domains = contacts.map((contact) => contact.email.split("@")[1]);
console.log("Email domains:", domains);

// Create simplified objects
const simplifiedContacts = contacts.map((contact) => ({
  name: `${contact.firstName} ${contact.lastName}`,
  email: contact.email,
}));

console.log("Simplified contacts:", simplifiedContacts);

console.log("\n --- filter() Method ---");

// Filter contacts with Gmail addresses
const gmailContacts = contacts.filter((contact) =>
  contact.email.includes("gmail")
);
console.log(
  "Gmail contacts:",
  gmailContacts.map((contact) => contact.email)
);

// Filter by name length
const ContactNameLength = contacts.filter(
  (contact) => (contact.firstName + " " + contact.lastName).length > 10
);
console.log(
  "Contacts with name length greater than 10:",
  ContactNameLength.map((contact) => contact.firstName + " " + contact.lastName)
);

// Filter using multiple conditions
const specificContacts = contacts.filter((contact) => {
  return contact.firstName.startsWith("J") && contact.email.includes(".com");
});
console.log(
  "Names starting with J and .com emails:",
  specificContacts.map((contact) => contact.firstName)
);

// Check what filter returns when nothing matches
const noMatch = contacts.filter(
  (contact) => contact.firstName === "NonExisitent"
);
console.log("No matches found:", noMatch);
