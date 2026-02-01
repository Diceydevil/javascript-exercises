// Reducer function - centralised state logic
function projectsReducer(state, action) {
  switch (action.type) {
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}
import { createContext, useState, useEffect, useContext } from "react";

const ProjectsContext = createContext();

export function ProjectsProvider({ children }) {
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
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
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
  };

  const handleDeleteProject = (projectId) => {
    const newProjects = projects.filter((project) => project.id !== projectId);
    setProjects(newProjects);
  };

  const handleEditProject = (projectId) => {
    const projectToEdit = projects.find((project) => project.id === projectId);
    setSelectedProject(projectToEdit);
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
    setSelectedProject(null);
  };

  const handleAssignStudents = (projectId) => {
    const projectToAssign = projects.find(
      (project) => project.id === projectId
    );
    setSelectedProject(projectToAssign);
  };

  const handleSaveAssignedStudents = (students) => {
    const updatedProjects = projects.map((project) => {
      if (project.id === selectedProject.id) {
        return {
          ...project,
          assignedStudents: students,
        };
      }
      return project;
    });
    setProjects(updatedProjects);
    console.log("Students saved successfully!");
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        selectedProject,
        setSelectedProject,
        handleDeleteProject,
        handleCreateProject,
        handleEditProject,
        handleUpdateProject,
        handleAssignStudents,
        handleSaveAssignedStudents,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  return useContext(ProjectsContext);
}
