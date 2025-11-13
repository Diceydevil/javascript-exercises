import "./styles.css";
import { App } from "./app";
import { UI } from "./ui";

// Initialize the app
const app = new App();

// Initialize the UI
const ui = new UI(app);

// Render initial state
ui.render();

// Make app accessible in console for debugging
window.app = app;
window.ui = ui;

console.log("✅ Todo List App loaded!");
console.log("📌 Debug commands:");
console.log("  - app.getAllProjects()");
console.log("  - app.getAllTodos()");
console.log("  - app.clearAll()  // Clear all data");
console.log("  - ui.render()     // Re-render UI");
