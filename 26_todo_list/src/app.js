import { Project } from "./project.js";
import { Todo } from "./todo.js";

export class App {
    constructor() {
        this.projects = [];
        this.todos = [];
        this.currentProjectId = null;
        this.init();
    }

    // Initialize app - load from localStorage or create default project
    init() {
        this.loadFromStorage();

        // Create default project if none exist
        if (this.projects.length === 0) {
            const defaultProject = new Project("My Tasks", "Default project for todos");
            this.addProject(defaultProject);
            this.currentProjectId = defaultProject.id;
        }
    }

    // ===== PROJECT CRUD =====

    addProject(project) {
        this.projects.push(project);
        this.saveToStorage();
        return project;
    }

    getProject(id) {
        return this.projects.find((p) => p.id === id);
    }

    getAllProjects() {
        return this.projects;
    }

    updateProject(id, updates) {
        const project = this.getProject(id);
        if (project) {
            project.update(updates);
            this.saveToStorage();
        }
        return project;
    }

    deleteProject(id) {
        // Delete all todos in this project first
        this.todos = this.todos.filter((todo) => todo.projectId !== id);

        // Delete the project
        this.projects = this.projects.filter((p) => p.id !== id);

        // If deleted current project, set to first available
        if (this.currentProjectId === id) {
            this.currentProjectId = this.projects[0]?.id || null;
        }

        this.saveToStorage();
    }

    // ===== TODO CRUD =====

    addTodo(todo) {
        this.todos.push(todo);
        this.saveToStorage();
        return todo;
    }

    getTodo(id) {
        return this.todos.find((t) => t.id === id);
    }

    getAllTodos() {
        return this.todos;
    }

    updateTodo(id, updates) {
        const todo = this.getTodo(id);
        if (todo) {
            todo.update(updates);
            this.saveToStorage();
        }
        return todo;
    }

    deleteTodo(id) {
        this.todos = this.todos.filter((t) => t.id !== id);
        this.saveToStorage();
    }

    // ===== COORDINATION METHODS =====

    // Get todos for specific project
    getTodosByProject(projectId) {
        return this.todos.filter((todo) => todo.projectId === projectId);
    }

    // Get todos by status
    getTodosByStatus(status) {
        return this.todos.filter((todo) => todo.status === status);
    }

    // Get overdue todos
    getOverdueTodos() {
        return this.todos.filter((todo) => todo.isOverdue());
    }

    // Get todos by priority
    getTodosByPriority(priority) {
        return this.todos.filter((todo) => todo.priority === priority);
    }

    // ===== LOCALSTORAGE (JSON) =====

    saveToStorage() {
        const data = {
            projects: this.projects,
            todos: this.todos,
            currentProjectId: this.currentProjectId,
        };
        localStorage.setItem("todoApp", JSON.stringify(data));
    }

    loadFromStorage() {
        const stored = localStorage.getItem("todoApp");
        if (stored) {
            const data = JSON.parse(stored);

            // Reconstruct Project instances
            this.projects = data.projects.map((p) => {
                const project = Object.assign(new Project(), p);
                return project;
            });

            // Reconstruct Todo instances
            this.todos = data.todos.map((t) => {
                const todo = Object.assign(new Todo(), t);
                return todo;
            });

            this.currentProjectId = data.currentProjectId;
        }
    }

    // Clear all data (useful for testing)
    clearAll() {
        this.projects = [];
        this.todos = [];
        this.currentProjectId = null;
        localStorage.removeItem("todoApp");
    }
}
