import { useState } from "react";
import Header from "./components/Header";
import ProjectCard from "./components/ProjectCard";

function App() {
  const projects = [
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
  ];
  return (
    <div className="min-h-screen">
      <Header />
      {projects.length === 0 ? (
        <p className="text-center text-gray-600 mt-8">
          No projects yet. Add your first project!
        </p>
      ) : (
        projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
          />
        ))
      )}
    </div>
  );
}

export default App;
