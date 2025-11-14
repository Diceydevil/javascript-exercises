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
                            <span class="font-semibold text-gray-900">${project.title}</span>
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
            return '<div class="todo-item" style="cursor: default; color: #95a5a6;">No todos yet</div>';
        }

        return todos
            .map(
                (todo) => `
            <div class="todo-item flex items-center gap-3 p-2" data-todo-id="${todo.id}">
                <input 
                    type="checkbox" 
                    class="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:outline-none flex-shrink-0 accent-black" 
                    data-todo-id="${todo.id}"
                    ${todo.status === "done" ? "checked" : ""}
                >
                <span class="flex-1 text-sm font-medium text-gray-900 ${todo.status === "done" ? "line-through text-gray-500" : ""}">${todo.title}</span>
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
            <div class="detail-header">
                <h2 class="detail-title">Project: ${project.title}</h2>
            </div>
            
            <div class="detail-section">
                <div class="detail-label">Title:</div>
                <input type="text" class="detail-input" id="editProjectTitle" value="${project.title}">
            </div>
            
            <div class="detail-section">
                <div class="detail-label">Description:</div>
                <textarea class="detail-textarea" id="editProjectDescription">${project.description}</textarea>
            </div>
            
            <div class="detail-section">
                <div class="detail-label">Lifecycle:</div>
                <select class="detail-input" id="editProjectLifecycle">
                    <option value="planning" ${
                        project.projectLifecycle === "planning" ? "selected" : ""
                    }>Planning</option>
                    <option value="inProgress" ${
                        project.projectLifecycle === "inProgress" ? "selected" : ""
                    }>In Progress</option>
                    <option value="completed" ${
                        project.projectLifecycle === "completed" ? "selected" : ""
                    }>Completed</option>
                    <option value="onHold" ${project.projectLifecycle === "onHold" ? "selected" : ""}>On Hold</option>
                    <option value="cancelled" ${
                        project.projectLifecycle === "cancelled" ? "selected" : ""
                    }>Cancelled</option>
                </select>
            </div>
            
            <div class="detail-section">
                <div class="detail-label">Compensation:</div>
                <select class="detail-input" id="editProjectCompensation">
                    <option value="paid" ${project.compensationType === "paid" ? "selected" : ""}>Paid</option>
                    <option value="unpaid" ${project.compensationType === "unpaid" ? "selected" : ""}>Unpaid</option>
                    <option value="volunteer" ${
                        project.compensationType === "volunteer" ? "selected" : ""
                    }>Volunteer</option>
                </select>
            </div>
            
            <div class="detail-section">
                <div class="detail-label">Deadline:</div>
                <input type="date" class="detail-input" id="editProjectDeadline" value="${project.deadline || ""}">
            </div>
            
            <div class="detail-actions">
                <button class="btn-primary" id="saveProjectBtn">Save Changes</button>
                <button class="btn-secondary" id="cancelEditBtn">Cancel</button>
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
            <div class="detail-header">
                <h2 class="detail-title">Todo: ${todo.title}</h2>
            </div>
            
            <div class="detail-section">
                <div class="detail-label">Title:</div>
                <input type="text" class="detail-input" id="editTodoTitle" value="${todo.title}">
            </div>
            
            <div class="detail-section">
                <div class="detail-label">Description:</div>
                <textarea class="detail-textarea" id="editTodoDescription">${todo.description}</textarea>
            </div>
            
            <div class="detail-section">
                <div class="detail-label">Status:</div>
                <select class="detail-input" id="editTodoStatus">
                    <option value="todo" ${todo.status === "todo" ? "selected" : ""}>To Do</option>
                    <option value="in-progress" ${todo.status === "in-progress" ? "selected" : ""}>In Progress</option>
                    <option value="done" ${todo.status === "done" ? "selected" : ""}>Done</option>
                </select>
            </div>
            
            <div class="detail-section">
                <div class="detail-label">Priority:</div>
                <select class="detail-input" id="editTodoPriority">
                    <option value="low" ${todo.priority === "low" ? "selected" : ""}>Low</option>
                    <option value="medium" ${todo.priority === "medium" ? "selected" : ""}>Medium</option>
                    <option value="high" ${todo.priority === "high" ? "selected" : ""}>High</option>
                </select>
            </div>
            
            <div class="detail-section">
                <div class="detail-label">Start Date:</div>
                <input type="date" class="detail-input" id="editTodoStartDate" value="${todo.startDate || ""}">
            </div>
            
            <div class="detail-section">
                <div class="detail-label">Deadline:</div>
                <input type="date" class="detail-input" id="editTodoDeadline" value="${todo.deadline || ""}">
            </div>
            
            <div class="detail-actions">
                <button class="btn-primary" id="saveTodoBtn">Save Changes</button>
                <button class="btn-danger" id="deleteTodoBtn">Delete Todo</button>
                <button class="btn-secondary" id="cancelEditBtn">Cancel</button>
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
            <div class="detail-header">
                <h2 class="detail-title">New Project</h2>
            </div>
            
            <div class="detail-section">
                <div class="detail-label">Title:*</div>
                <input type="text" class="detail-input" id="newProjectTitle" placeholder="Project name">
            </div>
            
            <div class="detail-section">
                <div class="detail-label">Description:</div>
                <textarea class="detail-textarea" id="newProjectDescription" placeholder="Project description"></textarea>
            </div>
            
            <div class="detail-section">
                <div class="detail-label">Compensation:</div>
                <select class="detail-input" id="newProjectCompensation">
                    <option value="unpaid">Unpaid</option>
                    <option value="paid">Paid</option>
                    <option value="volunteer">Volunteer</option>
                </select>
            </div>
            
            <div class="detail-section">
                <div class="detail-label">Deadline:</div>
                <input type="date" class="detail-input" id="newProjectDeadline">
            </div>
            
            <div class="detail-actions">
                <button class="btn-primary" id="createProjectBtn">Create Project</button>
                <button class="btn-secondary" id="cancelBtn">Cancel</button>
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
            <div class="detail-header">
                <h2 class="detail-title">New Todo</h2>
            </div>
            
            <div class="detail-section">
                <div class="detail-label">Title:*</div>
                <input type="text" class="detail-input" id="newTodoTitle" placeholder="Todo name">
            </div>
            
            <div class="detail-section">
                <div class="detail-label">Description:</div>
                <textarea class="detail-textarea" id="newTodoDescription" placeholder="Todo description"></textarea>
            </div>
            
            <div class="detail-section">
                <div class="detail-label">Priority:</div>
                <select class="detail-input" id="newTodoPriority">
                    <option value="low">Low</option>
                    <option value="medium" selected>Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            
            <div class="detail-section">
                <div class="detail-label">Start Date:</div>
                <input type="date" class="detail-input" id="newTodoStartDate">
            </div>
            
            <div class="detail-section">
                <div class="detail-label">Deadline:</div>
                <input type="date" class="detail-input" id="newTodoDeadline">
            </div>
            
            <div class="detail-actions">
                <button class="btn-primary" id="createTodoBtn">Create Todo</button>
                <button class="btn-secondary" id="cancelBtn">Cancel</button>
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
            <div class="empty-state">
                <p>Select a project or todo to view details</p>
            </div>
        `;
    }
}
