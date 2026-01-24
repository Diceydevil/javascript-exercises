import { useState, useEffect } from "react";
import Header from "./components/Header";
import ProjectForm from "./components/ProjectForm";
import Footer from "./components/Footer";
import StudentMemoryGame from "./components/StudentMemoryGame";
import { Link, Outlet } from "react-router";
import { CollectionProvider } from "./contexts/CollectionContext";

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
    setRightPanelView("empty");
    console.log("Students saved successfully!");
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
    <CollectionProvider>
      <div className="flex flex-col h-screen">
        <Header />

        <div className="flex flex-1 overflow-hidden">
          {/* Left Column - Sidebar (future) */}
          <div className="w-64 border border-black p-4 mx-2 my-4 rounded-lg">
            <h2 className="font-bold mb-4 text-xl">Navigation</h2>

            <nav className="flex flex-col gap-2">
              <Link
                to="/projects"
                className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-left"
              >
                📋 Projects
              </Link>

              <Link
                to="/pokemon"
                className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-left"
              >
                ⚡ Pokemon
              </Link>

              <Link
                to="/collection"
                className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-left"
              >
                🎒 My Collection
              </Link>
            </nav>
          </div>

          {/* Middle Column - Projects List */}
          <div className="flex-1 border border-black overflow-y-auto p-4 mx-2 my-4 rounded-lg">
            <Outlet
              context={{
                displayedProjects: displayedProjects,
                handleDeleteProject: handleDeleteProject,
                handleEditProject: handleEditProject,
                handleAssignStudents: handleAssignStudents,
                setRightPanelView: setRightPanelView,
              }}
            />
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
                <StudentMemoryGame
                  onSaveAssignedStudents={handleSaveAssignedStudents}
                />
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
    </CollectionProvider>
  );
}

export default App;
