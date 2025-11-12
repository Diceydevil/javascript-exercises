import "./styles.css";
import { Project } from "./project";
import { Todo } from "./todo";

console.log("=== Testing Project Creation ===\n");

// Test Project creation
const project1 = new Project("Build Portfolio", "Create personal website", null, "2025-12-31", "paid");

console.log("📁 Project Created: ", project1.title);
console.log(" ID:", project1.id);
console.log(" Title:", project1.title);
console.log(" Description:", project1.description);
console.log(" Project Lifecycle:", project1.projectLifecycle);
console.log(" Start Date:", project1.startDate);
console.log(" Deadline:", project1.deadline);
console.log(" Color:", project1.color);
console.log(" Full object:", project1);

console.log("\n=== Testing Todo Creation ===\n");

// Test Todo creation
const todo1 = new Todo(
    "Design Homepage",
    "Create wireframes and mockups",
    "2025-11-20",
    "high",
    project1.id,
    "2025-11-15"
);

console.log("📝 Todo Created: ", todo1.title);
console.log(" ID:", todo1.id);
console.log(" Project ID:", todo1.projectId);
console.log(" Sort Order:", todo1.sortOrder);
console.log(" Description:", todo1.description);
console.log(" Status:", todo1.status);
console.log(" Priority:", todo1.priority);
console.log(" Start Date:", todo1.startDate);
console.log(" Deadline:", todo1.deadline);
console.log(" Completion Date:", todo1.completionDate);
console.log(" Full object:", todo1);

console.log("\n=== Testing Todo Methods ===\n");

// Test startProgress
todo1.startProgress();
console.log("After startProgress():");
console.log(" Status:", todo1.status);

// Test complete
todo1.complete();
console.log("\nAfter complete():");
console.log(" Status:", todo1.status);
console.log(" Completion Date:", todo1.completionDate);

console.log("\n=== Testing Project Methods ===\n");

project1.start();
console.log("\nAfter start():");
console.log(" Lifecycle:", project1.projectLifecycle);
console.log(" Start Date:", project1.startDate);
