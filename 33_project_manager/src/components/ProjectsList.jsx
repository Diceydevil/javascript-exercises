import ProjectCard from "./ProjectCard";
import { useProjects } from "../contexts/ProjectsContext";
import { useOutletContext } from "react-router";

function ProjectsList() {
  const {
    projects,
    handleDeleteProject,
    handleEditProject,
    handleAssignStudents,
  } = useProjects();
  const { setRightPanelView } = useOutletContext();

  const handleEditWithPanel = (projectId) => {
    handleEditProject(projectId);
    setRightPanelView("editProject");
  };

  const handleAssignWithPanel = (projectId) => {
    handleAssignStudents(projectId);
    setRightPanelView("assignStudents");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Projects</h2>
        <button
          onClick={() => setRightPanelView("newProject")}
          className="bg-black text-white px-4 py-2 rounded"
        >
          + New Project
        </button>
      </div>

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
            onEdit={handleEditWithPanel}
            onAssignStudents={handleAssignWithPanel}
            assignedStudents={project.assignedStudents || []}
          />
        ))
      )}
    </div>
  );
}

export default ProjectsList;
