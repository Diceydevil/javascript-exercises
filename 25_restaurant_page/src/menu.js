export function loadMenu() {
    const content = document.getElementById("content");

    // Clear existing content
    content.innerHTML = "";

    // Create menu container
    const menuContainer = document.createElement("div");
    menuContainer.classList.add("menu-container");

    // Menu heading
    const heading = document.createElement("h1");
    heading.textContent = "Our Menu";
    menuContainer.appendChild(heading);

    // Menu items (you can customize these!)
    const menuItems = [
        { name: "Grilled Salmon", price: "$28", description: "Fresh Atlantic salmon with seasonal vegetables" },
        { name: "Ribeye Steak", price: "$42", description: "Prime aged beef with truffle mashed potatoes" },
        { name: "Pasta Carbonara", price: "$22", description: "Authentic Italian recipe with pancetta" },
        { name: "Caesar Salad", price: "$14", description: "Crisp romaine with house-made dressing" },
        { name: "Chocolate Lava Cake", price: "$12", description: "Warm chocolate cake with vanilla ice cream" },
    ];

    // Create menu items
    menuItems.forEach((item) => {
        const menuItem = document.createElement("div");
        menuItem.classList.add("menu-item");

        const itemHeader = document.createElement("div");
        itemHeader.classList.add("menu-item-header");

        const itemName = document.createElement("h3");
        itemName.textContent = item.name;

        const itemPrice = document.createElement("span");
        itemPrice.classList.add("price");
        itemPrice.textContent = item.price;

        itemHeader.appendChild(itemName);
        itemHeader.appendChild(itemPrice);

        const itemDesc = document.createElement("p");
        itemDesc.textContent = item.description;

        menuItem.appendChild(itemHeader);
        menuItem.appendChild(itemDesc);
        menuContainer.appendChild(menuItem);
    });

    content.appendChild(menuContainer);
}
