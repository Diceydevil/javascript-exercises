const contacts = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "555-1234",
    age: 30,
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@gmail.com",
    phone: "555-5678",
    age: 25,
  },
  {
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob.j@yahoo.com",
    phone: "555-9999",
    age: 35,
  },
  {
    firstName: "Alice",
    lastName: "Brown",
    email: "alice@gmail.com",
    phone: "555-1111",
    age: 28,
  },
  {
    firstName: "Charlie",
    lastName: "Davis",
    email: "charlie@example.com",
    phone: "555-2222",
    age: 42,
  },
];

console.log("--- Method Chaining ---");

// Example 1: Get emails of all Gmail users, sorted
const gmailEmails = contacts
  .filter((contact) => contact.email.includes("gmail"))
  .sort((firstContact, secondContact) =>
    firstContact.email.localeCompare(secondContact.email)
  )
  .map((contact) => contact.email);

console.log("Gmail emails (sorted by name):", gmailEmails);

// Exampel 2: Get names of contacts over 30, alphabetically
const over30Names = contacts
  .filter((contact) => contact.age > 30)
  .sort((firstContact, secondContact) => firstContact.age - secondContact.age)
  .map((contact) => `${contact.firstName} ${contact.lastName}`);

console.log("contacts over 30:", over30Names);

// Example 3: Complex chain - find, check, transform
const youngGmailCount = contacts
  .filter((contact) => contact.age < 30)
  .filter((contact) => contact.email.includes("gmail")).length;

console.log("young Gmail contacts:", youngGmailCount);

console.log("--- Search Function ---");

// Build a flexible search function
function searchContacts(contacts, searchTerm) {
  const term = searchTerm.toLowerCase();

  return contacts.filter((contact) => {
    return (
      contact.firstName.toLowerCase().includes(term) ||
      contact.lastName.toLowerCase().includes(term) ||
      contact.email.toLowerCase().includes(term)
    );
  });
}

// Test the search function
const results1 = searchContacts(contacts, "john");
console.log(
  "Search for 'john':",
  results1.map((contact) => contact.firstName)
);

const results2 = searchContacts(contacts, "gmail");
console.log(
  "Search for 'gmail':",
  results2.map((contact) => `${contact.firstName} (${contact.email})`)
);

const results3 = searchContacts(contacts, "Smith");
console.log(
  "Search 'Smith' (case-insensetive):",
  results3.map((contact) => contact.lastName)
);

const results4 = searchContacts(contacts, "xyz");
console.log("Search 'xyz' (no match):", results4);

console.log("\n--- CRUD Operations ---");

// Make a working copy for CRUD operations
let contactList = [...contacts];

// CREATE - Add a new contact
function addContact(list, newContact) {
  return [...list, newContact];
}

const newPerson = {
  firstName: "Emma",
  lastName: "Wilson",
  email: "emma@example.com",
  phone: "555-3333",
  age: 22,
};

contactList = addContact(contactList, newPerson);
console.log(
  "After adding Emma:",
  contactList.map((contact) => contact.firstName)
);

// READ - Find a specific contact
function getContactByEmail(list, email) {
  return list.find((contact) => contact.email === email);
}

const found = getContactByEmail(contactList, "emma@example.com");
console.log(
  "Found contact:",
  found ? `${found.firstName} ${found.lastName}` : "Not found"
);

// UPDATE - Modify a contact's information
function updateContact(list, email, updates) {
  return list.map((contact) =>
    contact.email === email ? { ...contact, ...updates } : contact
  );
}

contactList = updateContact(contactList, "emma@example.com", {
  age: 30,
  phone: "555-4444",
});
const updated = getContactByEmail(contactList, "emma@example.com");
console.log(
  "After update:",
  `${updated.firstName} - age: ${updated.age}, phone: ${updated.phone}`
);

// DELETE - Remove a contact
function deleteContact(list, email) {
  return list.filter((contact) => contact.email !== email);
}

contactList = deleteContact(contactList, "emma@example.com");
console.log(
  "After deleting Emma:",
  contactList.map((contact) => contact.firstName)
);
console.log("Final count:", contactList.length);
