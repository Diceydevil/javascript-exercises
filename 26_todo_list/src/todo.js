export class Todo {
    constructor(title, description, deadline, priority = "medium", projectId = "default", startDate = null) {
        this.id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
        this.projectId = projectId;
        this.sortOrder = 0;
        this.title = title;
        this.description = description;
        this.status = "todo"; // 'todo', 'in-progress', 'done'
        this.priority = priority; // 'low', 'medium', 'high'
        this.startDate = startDate;
        this.deadline = deadline;
        this.completionDate = null;
        this.createdAt = new Date().toISOString();
        this.updatedAt = new Date().toISOString();
    }

    // Mark as complete
    complete() {
        this.status = "done";
        this.completionDate = new Date().toISOString();
        this.updatedAt = new Date().toISOString();
    }

    // Start working on it
    startProgress() {
        this.status = "in-progress";
        this.updatedAt = new Date().toISOString();
    }

    // Update todo details
    update(updates) {
        Object.assign(this, updates);
        this.updatedAt = new Date().toISOString();
    }

    // Check if overdue
    isOverdue() {
        if (!this.deadline || this.status === "done") return false;
        return new Date(this.deadline) < new Date();
    }
}
