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
