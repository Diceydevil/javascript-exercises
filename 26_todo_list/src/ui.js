import { Project } from "./project.js";
import { Todo } from "./todo.js";

export class UI {
    constructor(app) {
        this.app = app;
        this.expandedProjects = new Set();
        this.initElements();
        this.attachEventListeners();
    }

    initElements() {
        this.projectsList = document.getElementById("projectsList");
        this.detailView = document.getElementById("detailView");
        this.addProjectBtn = document.getElementById("addProjectBtn");
    }

    attachEventListeners() {
        // Add new project button
        this.addProjectBtn.addEventListener("click", () => this.showAddProjectForm());

        // Event delegation for project and todo clicks
        this.projectsList.addEventListener("click", (e) => this.handleProjectListClick(e));
    }

    handleProjectListClick(e) {
        const projectHeader = e.target.closest(".project-header");
        const todoItem = e.target.closest(".todo-item");
        const deleteBtn = e.target.closest(".btn-delete-project");
        const addTodoBtn = e.target.closest(".btn-add-todo");
        const checkbox = e.target.closest(".todo-checkbox");

        if (checkbox) {
            e.stopPropagation();
            this.toggleTodoComplete(checkbox);
        } else if (deleteBtn) {
            e.stopPropagation();
            this.deleteProject(deleteBtn.dataset.projectId);
        } else if (addTodoBtn) {
            e.stopPropagation();
            this.showAddTodoForm(addTodoBtn.dataset.projectId);
        } else if (todoItem) {
            this.showTodoDetail(todoItem.dataset.todoId);
        } else if (projectHeader) {
            const projectId = projectHeader.dataset.projectId;
            const clickedTitle = e.target.closest(".project-title");

            if (clickedTitle) {
                this.showProjectDetail(projectId);
            } else {
                this.toggleProject(projectId);
            }
        }
    }

    toggleProject(projectId) {
        if (this.expandedProjects.has(projectId)) {
            this.expandedProjects.delete(projectId);
        } else {
            this.expandedProjects.add(projectId);
        }
        this.render();
    }

    toggleTodoComplete(checkbox) {
        const todoId = checkbox.dataset.todoId;
        const todo = this.app.getTodo(todoId);

        if (todo) {
            if (checkbox.checked) {
                todo.complete();
            } else {
                todo.status = "todo";
                todo.completionDate = null;
            }
            this.app.saveToStorage();
            this.render();
        }
    }

    // ===== RENDER METHODS =====

    render() {
        this.renderProjects();
    }

    renderProjects() {
        const projects = this.app.getAllProjects();

        if (projects.length === 0) {
            this.projectsList.innerHTML = `
                <div class="flex h-full items-center justify-center text-gray-500">
                    <p class="text-gray-500">No projects yet. Create one to get started!</p>
                </div>
            `;
            return;
        }

        this.projectsList.innerHTML = projects
            .map((project) => {
                const todos = this.app.getTodosByProject(project.id);
                const isExpanded = this.expandedProjects.has(project.id);
                const toggleIcon = isExpanded ? "📂" : "📁";

                return `
                <div class="mb-3 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div class="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 transition project-header" data-project-id="${project.id}">
                        <div class="flex flex-1 items-center gap-3">
                            <span class="text-xs text-gray-600">${toggleIcon}</span>
                            <div class="w-3 h-3 rounded-full flex-shrink-0" style="background-color: ${project.color}"></div>
                            <span class="project-title font-semibold text-gray-900">${project.title}</span>
                            <span class="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">${todos.length}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <button class="btn-add-todo p-1 text-gray-500 hover:text-blue-600 transition" data-project-id="${project.id}" title="Add todo">➕</button>
                            <button class="btn-delete-project p-1 text-gray-500 hover:text-red-600 transition" data-project-id="${project.id}" title="Delete project">🗑️</button>
                        </div>
                    </div>
                    <div class="${isExpanded ? "block" : "hidden"} mx-4 my-2 text-sm">
                        ${this.renderTodos(todos)}
                    </div>
                </div>
            `;
            })
            .join("");
    }

    renderTodos(todos) {
        if (todos.length === 0) {
            return '<div class="todo-item text-sm text-gray-500 text-right">NO TODOs YET.</div>';
        }

        return todos
            .map(
                (todo) => `
            <div class="todo-item flex items-center gap-3 p-2" data-todo-id="${todo.id}">
                <input 
                    type="checkbox" 
                    class="todo-checkbox w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:outline-none flex-shrink-0 accent-black" 
                    data-todo-id="${todo.id}"
                    ${todo.status === "done" ? "checked" : ""}
                >
                <span class="flex-1 text-sm text-left font-medium text-gray-900 ${todo.status === "done" ? "line-through text-gray-500" : ""}">${todo.title}</span>
                <span class="text-xs px-2 py-0.5 bg-gray-100 rounded-full flex-shrink-0 ${todo.priority === "high" ? "bg-red-100 font-bold" : todo.priority === "medium" ? "bg-yellow-100 font-bold" : "bg-green-100 font-bold"}">${todo.priority}</span>
            </div>
        `
            )
            .join("");
    }

    // ===== DETAIL VIEW METHODS =====

    showProjectDetail(projectId) {
        const project = this.app.getProject(projectId);
        if (!project) return;

        this.detailView.innerHTML = `
            <div class="flex flex-col h-full">
                <!-- Title Section (inline with underline) -->
                <div class="mb-6">
                    <div class="flex items-center gap-2 pb-2 border-b-2 border-gray-900">
                        <span class="text-xl font-bold text-gray-900">Title:</span>
                        <input type="text" class="text-xl flex-1 bg-transparent border-none focus:outline-none font-medium text-gray-900" id="editProjectTitle" value="${project.title}" placeholder="Example Title">
                    </div>
                </div>
                
                <!-- Metadata Section (inline fields) -->
                <div class="space-y-3 mb-6">
                    <div class="flex items-center gap-2">
                        <span class="font-bold text-gray-900">Lifecycle:</span>
                        <select class="flex-1 bg-transparent border-none focus:outline-none text-gray-700" id="editProjectLifecycle">
                            <option value="planning" ${project.projectLifecycle === "planning" ? "selected" : ""}>Planning</option>
                            <option value="inProgress" ${project.projectLifecycle === "inProgress" ? "selected" : ""}>In Progress</option>
                            <option value="completed" ${project.projectLifecycle === "completed" ? "selected" : ""}>Completed</option>
                            <option value="onHold" ${project.projectLifecycle === "onHold" ? "selected" : ""}>On Hold</option>
                            <option value="cancelled" ${project.projectLifecycle === "cancelled" ? "selected" : ""}>Cancelled</option>
                        </select>
                    </div>
                    
                    <div class="flex items-center gap-2">
                        <span class="font-bold text-gray-900">Compensation:</span>
                        <select class="flex-1 bg-transparent border-none focus:outline-none text-gray-700" id="editProjectCompensation">
                            <option value="paid" ${project.compensationType === "paid" ? "selected" : ""}>Paid</option>
                            <option value="unpaid" ${project.compensationType === "unpaid" ? "selected" : ""}>Unpaid</option>
                            <option value="volunteer" ${project.compensationType === "volunteer" ? "selected" : ""}>Volunteer</option>
                        </select>
                    </div>
                    
                    <div class="flex items-center gap-2">
                        <span class="font-bold text-gray-900">Deadline:</span>
                        <input type="date" class="flex-1 bg-transparent border-none focus:outline-none text-gray-700" id="editProjectDeadline" value="${project.deadline || ""}">
                    </div>
                </div>
                
                <!-- Horizontal Separator -->
                <div class="border-b-2 border-gray-900 mb-6"></div>
                
                <!-- Description Section -->
                <div class="flex-1 flex flex-col">
                    <label class="font-bold text-gray-900 mb-3">Description:</label>
                    <textarea class="flex-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" id="editProjectDescription" placeholder="text editor in here">${project.description}</textarea>
                </div>
                
                <!-- Action Buttons (optional, add if needed) -->
                <div class="flex gap-3 mt-6 pt-4 border-t border-gray-200">
                    <button class="flex-1 px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition" id="saveProjectBtn">Save Changes</button>
                    <button class="flex-1 px-4 py-2 bg-gray-500 text-white font-medium rounded-md hover:bg-gray-600 transition" id="cancelEditBtn">Cancel</button>
                </div>
            </div>
        `;

        // Attach save handler
        document.getElementById("saveProjectBtn").addEventListener("click", () => {
            this.saveProjectChanges(projectId);
        });

        document.getElementById("cancelEditBtn").addEventListener("click", () => {
            this.clearDetailView();
        });
    }

    showTodoDetail(todoId) {
        const todo = this.app.getTodo(todoId);
        if (!todo) return;

        this.detailView.innerHTML = `
            <div class="flex flex-col h-full">
                <!-- Title Section (inline with underline) -->
                <div class="mb-6">
                    <div class="flex items-center gap-2 pb-2 border-b-2 border-gray-900">
                        <span class="text-xl font-bold text-gray-900">Title:</span>
                        <input type="text" class="text-xl flex-1 bg-transparent border-none focus:outline-none font-medium text-gray-900" id="editTodoTitle" value="${todo.title}" placeholder="Example Title">
                    </div>
                </div>
                
                <!-- Metadata Section (inline fields) -->
                <div class="space-y-3 mb-6">
                    <div class="flex items-center gap-2">
                        <span class="font-bold text-gray-900">Status:</span>
                        <select class="flex-1 bg-transparent border-none focus:outline-none text-gray-700" id="editTodoStatus">
                            <option value="todo" ${todo.status === "todo" ? "selected" : ""}>To Do</option>
                            <option value="in-progress" ${todo.status === "in-progress" ? "selected" : ""}>In Progress</option>
                            <option value="done" ${todo.status === "done" ? "selected" : ""}>Done</option>
                        </select>
                    </div>
                    
                    <div class="flex items-center gap-2">
                        <span class="font-bold text-gray-900">Priority:</span>
                        <select class="flex-1 bg-transparent border-none focus:outline-none text-gray-700" id="editTodoPriority">
                            <option value="low" ${todo.priority === "low" ? "selected" : ""}>Low</option>
                            <option value="medium" ${todo.priority === "medium" ? "selected" : ""}>Medium</option>
                            <option value="high" ${todo.priority === "high" ? "selected" : ""}>High</option>
                        </select>
                    </div>
                    
                    <div class="flex items-center gap-2">
                        <span class="font-bold text-gray-900">Start Date:</span>
                        <input type="date" class="flex-1 bg-transparent border-none focus:outline-none text-gray-700" id="editTodoStartDate" value="${todo.startDate || ""}">
                    </div>
                    
                    <div class="flex items-center gap-2">
                        <span class="font-bold text-gray-900">Deadline:</span>
                        <input type="date" class="flex-1 bg-transparent border-none focus:outline-none text-gray-700" id="editTodoDeadline" value="${todo.deadline || ""}">
                    </div>
                </div>
                
                <!-- Horizontal Separator -->
                <div class="border-b-2 border-gray-900 mb-6"></div>
                
                <!-- Description Section -->
                <div class="flex-1 flex flex-col">
                    <label class="font-bold text-gray-900 mb-3">Description:</label>
                    <textarea class="flex-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" id="editTodoDescription" placeholder="Add description here">${todo.description}</textarea>
                </div>
                
                <!-- Action Buttons -->
                <div class="flex gap-3 mt-6 pt-4 border-t border-gray-200">
                    <button class="flex-1 px-4 py-2 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition" id="saveTodoBtn">Save</button>
                    <button class="flex-1 px-4 py-2 bg-gray-200 text-gray-900 font-medium rounded-md hover:bg-gray-300 transition" id="deleteTodoBtn">Delete</button>
                    <button class="flex-1 px-4 py-2 bg-gray-200 text-gray-900 font-medium rounded-md hover:bg-gray-300 transition" id="cancelEditBtn">Cancel</button>
                </div>
            </div>
        `;

        // Attach handlers
        document.getElementById("saveTodoBtn").addEventListener("click", () => {
            this.saveTodoChanges(todoId);
        });

        document.getElementById("deleteTodoBtn").addEventListener("click", () => {
            if (confirm("Are you sure you want to delete this todo?")) {
                this.app.deleteTodo(todoId);
                this.clearDetailView();
                this.render();
            }
        });

        document.getElementById("cancelEditBtn").addEventListener("click", () => {
            this.clearDetailView();
        });
    }

    // ===== SAVE METHODS =====

    saveProjectChanges(projectId) {
        const updates = {
            title: document.getElementById("editProjectTitle").value,
            description: document.getElementById("editProjectDescription").value,
            projectLifecycle: document.getElementById("editProjectLifecycle").value,
            compensationType: document.getElementById("editProjectCompensation").value,
            deadline: document.getElementById("editProjectDeadline").value,
        };

        this.app.updateProject(projectId, updates);
        this.render();
        this.clearDetailView();
        console.log("✅ Project updated successfully");
    }

    saveTodoChanges(todoId) {
        const updates = {
            title: document.getElementById("editTodoTitle").value,
            description: document.getElementById("editTodoDescription").value,
            status: document.getElementById("editTodoStatus").value,
            priority: document.getElementById("editTodoPriority").value,
            startDate: document.getElementById("editTodoStartDate").value,
            deadline: document.getElementById("editTodoDeadline").value,
        };

        this.app.updateTodo(todoId, updates);
        this.render();
        this.clearDetailView();
        console.log("✅ Todo updated successfully");
    }

    // ===== ADD FORMS =====

    showAddProjectForm() {
        this.detailView.innerHTML = `
            <div class="flex flex-col h-full">
                <!-- Title Section (inline with underline) -->
                <div class="mb-6">
                    <div class="flex items-center gap-2 pb-2 border-b-2 border-gray-900">
                        <span class="text-xl font-bold text-gray-900">Title:</span>
                        <input type="text" class="text-xl flex-1 bg-transparent border-none focus:outline-none font-medium text-gray-900" id="newProjectTitle" placeholder="New Project Title">
                    </div>
                </div>

                <!-- Metadata Section (inline fields) -->
                <div class="space-y-3 mb-6">
                    <div class="flex items-center gap-2">
                        <span class="font-bold text-gray-900">Lifecycle:</span>
                        <select class="flex-1 bg-transparent border-none focus:outline-none text-gray-700" id="newProjectLifecycle">
                            <option value="planning">Planning</option>
                            <option value="inProgress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="onHold">On Hold</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                    
                    <div class="flex items-center gap-2">
                        <span class="font-bold text-gray-900">Compensation:</span>
                        <select class="flex-1 bg-transparent border-none focus:outline-none text-gray-700" id="newProjectCompensation">
                            <option value="paid">Paid</option>
                            <option value="unpaid">Unpaid</option>
                            <option value="volunteer">Volunteer</option>
                        </select>
                    </div>
                    
                    <div class="flex items-center gap-2">
                        <span class="font-bold text-gray-900">Deadline:</span>
                        <input type="date" class="flex-1 bg-transparent border-none focus:outline-none text-gray-700" id="newProjectDeadline">
                    </div>
                </div>

                <!-- Horizontal Separator -->
                <div class="border-b-2 border-gray-900 mb-6"></div>
                
                <!-- Description Section -->
                <div class="flex-1 flex flex-col">
                    <label class="font-bold text-gray-900 mb-3">Description:</label>
                    <textarea class="flex-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" id="newProjectDescription" placeholder="Add description here"></textarea>
                </div>
                
                <div class="flex gap-3 mt-6 pt-4 border-t border-gray-200">
                    <button class="flex-1 px-4 py-2 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition" id="createProjectBtn">Create Project</button>
                    <button class="flex-1 px-4 py-2 bg-gray-200 text-gray-900 font-medium rounded-md hover:bg-gray-300 transition" id="cancelBtn">Cancel</button>
                </div>
            </div>
        `;

        document.getElementById("createProjectBtn").addEventListener("click", () => {
            this.createProject();
        });

        document.getElementById("cancelBtn").addEventListener("click", () => {
            this.clearDetailView();
        });

        // Focus title input
        document.getElementById("newProjectTitle").focus();
    }

    showAddTodoForm(projectId) {
        this.detailView.innerHTML = `
            <div class="flex flex-col h-full">
                <!-- Title Section (inline with underline) -->
                <div class="mb-6">
                    <div class="flex items-center gap-2 pb-2 border-b-2 border-gray-900">
                        <span class="text-xl font-bold text-gray-900">Title:</span>
                        <input type="text" class="text-xl flex-1 bg-transparent border-none focus:outline-none font-medium text-gray-900" id="newTodoTitle" placeholder="New Todo Title">
                    </div>
                </div>

                <!-- Metadata Section (inline fields) -->
                <div class="space-y-3 mb-6">
                    <div class="flex items-center gap-2">
                        <span class="font-bold text-gray-900">Status:</span>
                        <select class="flex-1 bg-transparent border-none focus:outline-none text-gray-700" id="newTodoStatus">
                            <option value="todo">To Do</option>
                            <option value="in-progress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                    </div>
                    
                    <div class="flex items-center gap-2">
                        <span class="font-bold text-gray-900">Priority:</span>
                        <select class="flex-1 bg-transparent border-none focus:outline-none text-gray-700" id="newTodoPriority">
                            <option value="low">Low</option>
                            <option value="medium" selected>Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    
                    <div class="flex items-center gap-2">
                        <span class="font-bold text-gray-900">Start Date:</span>
                        <input type="date" class="flex-1 bg-transparent border-none focus:outline-none text-gray-700" id="newTodoStartDate">
                    </div>
                    
                    <div class="flex items-center gap-2">
                        <span class="font-bold text-gray-900">Deadline:</span>
                        <input type="date" class="flex-1 bg-transparent border-none focus:outline-none text-gray-700" id="newTodoDeadline">
                    </div>
                </div>

                <!-- Horizontal Separator -->
                <div class="border-b-2 border-gray-900 mb-6"></div>
                
                <!-- Description Section -->
                <div class="flex-1 flex flex-col">
                    <label class="font-bold text-gray-900 mb-3">Description:</label>
                    <textarea class="flex-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" id="newTodoDescription" placeholder="Add description here"></textarea>
                </div>
                
                <div class="flex gap-3 mt-6 pt-4 border-t border-gray-200">
                    <button class="flex-1 px-4 py-2 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition" id="createTodoBtn">Create Todo</button>
                    <button class="flex-1 px-4 py-2 bg-gray-200 text-gray-900 font-medium rounded-md hover:bg-gray-300 transition" id="cancelBtn">Cancel</button>
                </div>
            </div>
        `;

        document.getElementById("createTodoBtn").addEventListener("click", () => {
            this.createTodo(projectId);
        });

        document.getElementById("cancelBtn").addEventListener("click", () => {
            this.clearDetailView();
        });

        // Focus title input
        document.getElementById("newTodoTitle").focus();
    }

    // ===== CREATE METHODS =====

    createProject() {
        const title = document.getElementById("newProjectTitle").value.trim();

        if (!title) {
            alert("Please enter a project title");
            return;
        }

        const description = document.getElementById("newProjectDescription").value.trim();
        const compensationType = document.getElementById("newProjectCompensation").value;
        const deadline = document.getElementById("newProjectDeadline").value;

        const newProject = new Project(title, description, null, deadline, compensationType);

        this.app.addProject(newProject);
        this.render();
        this.clearDetailView();
        console.log("✅ Project created:", title);
    }

    createTodo(projectId) {
        const title = document.getElementById("newTodoTitle").value.trim();

        if (!title) {
            alert("Please enter a todo title");
            return;
        }

        const description = document.getElementById("newTodoDescription").value.trim();
        const priority = document.getElementById("newTodoPriority").value;
        const startDate = document.getElementById("newTodoStartDate").value;
        const deadline = document.getElementById("newTodoDeadline").value;

        const newTodo = new Todo(title, description, deadline, priority, projectId, startDate);

        this.app.addTodo(newTodo);

        // Auto-expand the project
        this.expandedProjects.add(projectId);

        this.render();
        this.clearDetailView();
        console.log("✅ Todo created:", title);
    }

    // ===== DELETE METHODS =====

    deleteProject(projectId) {
        const project = this.app.getProject(projectId);
        const todos = this.app.getTodosByProject(projectId);

        const message =
            todos.length > 0
                ? `Delete "${project.title}" and its ${todos.length} todo(s)?`
                : `Delete "${project.title}"?`;

        if (confirm(message)) {
            this.app.deleteProject(projectId);
            this.expandedProjects.delete(projectId);
            this.render();
            this.clearDetailView();
            console.log("✅ Project deleted");
        }
    }

    // ===== UTILITY =====

    clearDetailView() {
        this.detailView.innerHTML = `
            <div class="empty-state flex items-center justify-center h-full text-center">
                <p class="text-gray-500 text-sm">Select a project or todo to view and edit details, or add a new one.</p>
            </div>
        `;
    }
}
