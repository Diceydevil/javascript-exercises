import { useState, useEffect } from "react";
import Header from "./components/Header";
import ProjectCard from "./components/ProjectCard";
import ProjectForm from "./components/ProjectForm";
import Footer from "./components/Footer";
import StudentMemoryGame from "./components/StudentMemoryGame";

function App() {
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem("projects");

    if (savedProjects) {
      return JSON.parse(savedProjects);
    }

    return [
      {
        id: 1,
        title: "Website Redesign",
        description: "Redesign company website",
        assignedStudents: [],
      },
      {
        id: 2,
        title: "Mobile App",
        description: "Build mobile application",
        assignedStudents: [],
      },
    ];
  });
  const [rightPanelView, setRightPanelView] = useState("empty");
  const [selectedProject, setSelectedProject] = useState(null);
  const [sortOrder, setSortOrder] = useState("none");

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
    console.log("Saved to localStorage:", projects);
  }, [projects]);

  const handleCreateProject = (projectData) => {
    const maxId =
      projects.length > 0
        ? Math.max(...projects.map((project) => project.id))
        : 0;
    const newProject = {
      id: maxId + 1,
      title: projectData.title,
      description: projectData.description,
    };
    setProjects([...projects, newProject]);
    setRightPanelView("empty");
  };

  const handleDeleteProject = (projectId) => {
    const newProjects = projects.filter((project) => project.id !== projectId);
    setProjects(newProjects);
  };

  const handleEditProject = (projectId) => {
    const projectToEdit = projects.find((project) => project.id === projectId);
    setSelectedProject(projectToEdit);
    setRightPanelView("editProject");
  };

  const handleUpdateProject = (projectData) => {
    const updatedProjects = projects.map((project) => {
      if (project.id === selectedProject.id) {
        return {
          ...project,
          title: projectData.title,
          description: projectData.description,
        };
      }
      return project;
    });

    setProjects(updatedProjects);
    setRightPanelView("empty");
    setSelectedProject(null);
  };

  const handleAssignStudents = (projectId) => {
    const projectToAssign = projects.find(
      (project) => project.id === projectId
    );
    setSelectedProject(projectToAssign);
    setRightPanelView("assignStudents");
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const displayedProjects = (() => {
    if (sortOrder === "asc") {
      return [...projects].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === "desc") {
      return [...projects].sort((a, b) => b.title.localeCompare(a.title));
    } else {
      return projects;
    }
  })();

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Column - Sidebar (future) */}
        <div className="w-64 border border-black p-4 mx-2 my-4 rounded-lg">
          <h2 className="font-bold mb-4 text-xl">Sidebar Menu (Practice)</h2>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleSortChange("none")}
              className={`px-4 py-2 rounded text-left ${
                sortOrder === "none"
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Default Order
            </button>

            <button
              onClick={() => handleSortChange("asc")}
              className={`px-4 py-2 rounded text-left ${
                sortOrder === "asc"
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              A → Z
            </button>

            <button
              onClick={() => handleSortChange("desc")}
              className={`px-4 py-2 rounded text-left ${
                sortOrder === "desc"
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Z → A
            </button>
          </div>
        </div>

        {/* Middle Column - Projects List */}
        <div className="flex-1 border border-black overflow-y-auto p-4 mx-2 my-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Projects</h2>
            <button
              onClick={() => setRightPanelView("newProject")}
              className="bg-black text-white px-4 py-2 rounded"
            >
              + New Project
            </button>
          </div>

          {/* Projects list goes here */}
          {displayedProjects.length === 0 ? (
            <p className="text-center text-gray-600 mt-8">
              No projects yet. Add your first project!
            </p>
          ) : (
            displayedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                onDelete={handleDeleteProject}
                onEdit={handleEditProject}
                onAssignStudents={handleAssignStudents}
              />
            ))
          )}
        </div>

        {/* Right Column - Form/Detail Panel */}
        <div className="w-96 border border-black p-4 mx-2 my-4 overflow-y-auto rounded-lg">
          {rightPanelView === "empty" && (
            <p className="text-gray-500 text-center mt-8">
              Select a project or add a new one
            </p>
          )}

          {rightPanelView === "newProject" && (
            <div>
              <ProjectForm onCreateProject={handleCreateProject} />
              <button
                onClick={() => setRightPanelView("empty")}
                className="bg-black text-white px-3 py-1 rounded mt-4"
              >
                Cancel
              </button>
            </div>
          )}

          {rightPanelView === "editProject" && (
            <div>
              <ProjectForm
                project={selectedProject}
                onSave={handleUpdateProject}
              />
              <button
                onClick={() => setRightPanelView("empty")}
                className="bg-black text-white px-3 py-1 rounded mt-4"
              >
                Cancel
              </button>
            </div>
          )}

          {rightPanelView === "assignStudents" && (
            <div>
              <StudentMemoryGame />
              <button
                onClick={() => setRightPanelView("empty")}
                className="bg-black text-white px-3 py-1 rounded mt-4"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
