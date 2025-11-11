export function loadHome() {
    const content = document.getElementById("content");

    // Clear any existing content
    content.innerHTML = "";

    // Create a container for homepage content
    const homeContainer = document.createElement("div");
    homeContainer.classList.add("home-container");

    // 1. Main heading
    const heading = document.createElement("h1");
    heading.textContent = "The Golden Spoon";
    homeContainer.appendChild(heading);

    // 2. Tagline
    const tagline = document.createElement("p");
    tagline.textContent = "Where Every Meal is a Masterpiece";
    tagline.classList.add("tagline");
    homeContainer.appendChild(tagline);

    // 3. Hero image
    const heroImage = document.createElement("img");
    heroImage.src = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800";
    heroImage.alt = "Restaurant interior";
    heroImage.classList.add("hero-image");
    homeContainer.appendChild(heroImage);

    // 4. Description
    const description = document.createElement("p");
    description.textContent =
        "Experience fine dining at its best. Our award-winning chefs create extraordinary dishes using locally sourced ingredients.";
    description.classList.add("description");
    homeContainer.appendChild(description);

    // 5. Hours of operation
    const hours = document.createElement("p");
    hours.textContent = "Open Daily: 11:00 AM - 10:00 PM";
    hours.classList.add("hours");
    homeContainer.appendChild(hours);

    // 6. Button container
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    // 7. Book now button
    const bookButton = document.createElement("button");
    bookButton.textContent = "Book Now";
    bookButton.classList.add("cta-button");
    buttonContainer.appendChild(bookButton);

    // 8. See menu button
    const menuButton = document.createElement("button");
    menuButton.textContent = "See Our Menu";
    menuButton.classList.add("cta-button", "secondary");
    buttonContainer.appendChild(menuButton);

    homeContainer.appendChild(buttonContainer);

    // Append everything to content div
    content.appendChild(homeContainer);
}
