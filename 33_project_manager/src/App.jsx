import { useState, useEffect } from "react";
import Header from "./components/Header";
import ProjectForm from "./components/ProjectForm";
import Footer from "./components/Footer";
import StudentMemoryGame from "./components/StudentMemoryGame";
import { Link, Outlet } from "react-router";
import { CollectionProvider } from "./contexts/CollectionContext";
import { ProjectsProvider, useProjects } from "./contexts/ProjectsContext";

function AppContent() {
  const {
    selectedProject,
    handleCreateProject,
    handleUpdateProject,
    handleSaveAssignedStudents,
  } = useProjects();
  const [rightPanelView, setRightPanelView] = useState("empty");
  const [sortOrder, setSortOrder] = useState("none");

  return (
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
          <Outlet context={{ setRightPanelView }} />
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
              <ProjectForm
                onCreateProject={(data) => {
                  handleCreateProject(data);
                  setRightPanelView("empty");
                }}
              />
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
                onSave={(data) => {
                  handleUpdateProject(data);
                  setRightPanelView("empty");
                }}
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
                onSaveAssignedStudents={(students) => {
                  handleSaveAssignedStudents(students);
                  setRightPanelView("empty");
                }}
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
  );
}

function App() {
  return (
    <ProjectsProvider>
      <CollectionProvider>
        <AppContent />
      </CollectionProvider>
    </ProjectsProvider>
  );
}

export default App;
