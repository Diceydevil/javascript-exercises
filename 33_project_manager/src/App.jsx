import { useState } from "react";
import Header from "./components/Header";
import ProjectCard from "./components/ProjectCard";

function App() {
  const projects = [
    { id: 1, title: "Project 1", description: "Project description" },
    { id: 2, title: "Project 2", description: "Project 2 description" },
    { id: 3, title: "Project 3", description: "Project 3 description" },
  ];
  return (
    <div className="min-h-screen bg-gray-300">
      <Header />
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          title={project.title}
          description={project.description}
        />
      ))}
    </div>
  );
}

export default App;
