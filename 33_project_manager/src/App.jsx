import { useState } from "react";
import Header from "./components/Header";
import ProjectCard from "./components/ProjectCard";

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
    <div className="min-h-screen">
      <Header />
      <button
        onClick={handleAddProject}
        className="ml-auto block bg-black text-white px-4 py-2 rounded mt-4 mr-4"
      >
        + New Project
      </button>
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
  );
}

export default App;
