import { useState } from "react";
import Header from "./components/Header";
import ProjectCard from "./components/ProjectCard";
import ProjectForm from "./components/ProjectForm";

function App() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Website Redesign",
      description: "Redesign company website",
    },
    {
      id: 2,
      title: "Mobile App",
      description: "Build mobile application",
    },
  ]);
  const [rightPanelView, setRightPanelView] = useState("empty");
  const [selectedProject, setSelectedProject] = useState(null);

  const handleAddProject = () => {
    const maxId =
      projects.length > 0
        ? Math.max(...projects.map((project) => project.id)) // spreated operator in here unpack the array so math.max can read the answers of the .map() method.
        : 0;
    const newProject = {
      id: maxId + 1,
      title: `Project`,
      description: `Description for project ${maxId + 1}`,
    };
    setProjects([...projects, newProject]);
  };

  const handleDeleteProject = (projectId) => {
    const newProjects = projects.filter((project) => project.id !== projectId);
    setProjects(newProjects);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Column - Sidebar (future) */}
        <div className="w-64 border-r border-gray-200 p-4 bg-gray-50">
          <h2 className="font-bold mb-4">Sidebar</h2>
          <p className="text-sm text-gray-500">Future navigation</p>
        </div>

        {/* Middle Column - Projects List */}
        <div className="flex-1 overflow-y-auto p-4">
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
          {projects.length === 0 ? (
            <p className="text-center text-gray-600 mt-8">
              No projects yet. Add your first project!
            </p>
          ) : (
            projects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                onDelete={handleDeleteProject}
              />
            ))
          )}
        </div>

        {/* Right Column - Form/Detail Panel */}
        <div className="w-96 border-l border-gray-200 p-4 bg-gray-50 overflow-y-auto">
          {rightPanelView === "empty" && (
            <p className="text-gray-500 text-center mt-8">
              Select a project or add a new one
            </p>
          )}

          {rightPanelView === "newProject" && (
            <div>
              <ProjectForm />
              <button
                onClick={() => setRightPanelView("empty")}
                className="bg-gray-500 text-white px-3 py-1 rounded mt-4"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
