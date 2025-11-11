export function loadContact() {
    const content = document.getElementById("content");

    // Clear existing content
    content.innerHTML = "";

    // Create contact container
    const contactContainer = document.createElement("div");
    contactContainer.classList.add("contact-container");

    // Contact heading
    const heading = document.createElement("h1");
    heading.textContent = "Contact Us";
    contactContainer.appendChild(heading);

    // Contact info
    const contactInfo = [
        { label: "Phone", value: "(555) 123-4567" },
        { label: "Email", value: "info@goldenspoon.com" },
        { label: "Address", value: "123 Fine Dining Street, Gourmet City, GC 12345" },
    ];

    contactInfo.forEach((info) => {
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("contact-info");

        const label = document.createElement("strong");
        label.textContent = info.label + ": ";

        const value = document.createElement("span");
        value.textContent = info.value;

        infoDiv.appendChild(label);
        infoDiv.appendChild(value);
        contactContainer.appendChild(infoDiv);
    });

    // Hours section
    const hoursHeading = document.createElement("h2");
    hoursHeading.textContent = "Hours of Operation";
    contactContainer.appendChild(hoursHeading);

    const hours = document.createElement("p");
    hours.textContent = "Monday - Sunday: 11:00 AM - 10:00 PM";
    contactContainer.appendChild(hours);

    content.appendChild(contactContainer);
}
