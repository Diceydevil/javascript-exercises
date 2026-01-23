import { useOutletContext } from "react-router";
import ProjectCard from "./ProjectCard";

function ProjectsList() {
  const {
    displayedProjects,
    handleDeleteProject,
    handleEditProject,
    handleAssignStudents,
    setRightPanelView,
  } = useOutletContext();

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
            assignedStudents={project.assignedStudents || []}
          />
        ))
      )}
    </div>
  );
}

export default ProjectsList;
