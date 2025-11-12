export class Project {
    constructor(title, description = "", startDate = null, deadline = null, compensationType = "unpaid") {
        this.id = Date.now().toString() + Math.random().toString(36).substring(2, 15);
        this.title = title;
        this.description = description;
        this.color = this.generateRandomColor(); // Random color for visual distinction
        this.startDate = startDate;
        this.deadline = deadline;
        this.completionDate = null;
        this.compensationType = compensationType; // 'paid', 'unpaid', 'volunteer'
        this.examples = []; // Array of example URLs/images
        this.projectLifecycle = "planning"; // 'planning', 'inProgress', 'completed', 'onHold', 'cancelled'
        this.createdAt = new Date().toISOString();
        this.updatedAt = new Date().toISOString();
    }

    // Generate random color for project
    generateRandomColor() {
        const colors = ["#3498db", "#e74c3c", "#2ecc71", "#f39c12", "#9b59b6", "#1abc9c"];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Update project details
    update(updates) {
        Object.assign(this, updates);
        this.updatedAt = new Date().toISOString();
    }

    // Start the project
    start() {
        this.projectLifecycle = "inProgress";
        if (!this.startDate) {
            this.startDate = new Date().toISOString();
        }
        this.updatedAt = new Date().toISOString();
    }

    // Complete the project
    complete() {
        this.projectLifecycle = "completed";
        this.completionDate = new Date().toISOString();
        this.updatedAt = new Date().toISOString();
    }

    // Put project on hold
    pause() {
        this.projectLifecycle = "onHold";
        this.updatedAt = new Date().toISOString();
    }

    // Add example/portfolio item
    addExample(url) {
        this.examples.push(url);
        this.updatedAt = new Date().toISOString();
    }

    // Check if project is overdue
    isOverdue() {
        if (!this.deadline || this.projectLifecycle === "completed") return false;
        return new Date(this.deadline) < new Date();
    }
}
