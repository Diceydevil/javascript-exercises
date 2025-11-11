import "./styles.css";
import { loadMenu } from "./menu.js";
import { loadContact } from "./contact.js";
import { loadHome } from "./home.js";

const homeBtn = document.getElementById("home-btn");
const menuBtn = document.getElementById("menu-btn");
const contactBtn = document.getElementById("contact-btn");

// Function to remove active class from all buttons
function clearActive() {
    homeBtn.classList.remove("active");
    menuBtn.classList.remove("active");
    contactBtn.classList.remove("active");
}

// Add event listeners with active state management
homeBtn.addEventListener("click", () => {
    clearActive();
    homeBtn.classList.add("active");
    loadHome();
});

menuBtn.addEventListener("click", () => {
    clearActive();
    menuBtn.classList.add("active");
    loadMenu();
});

contactBtn.addEventListener("click", () => {
    clearActive();
    contactBtn.classList.add("active");
    loadContact();
});

// Load homepage and set it as active on initial load
homeBtn.classList.add("active");
loadHome();
