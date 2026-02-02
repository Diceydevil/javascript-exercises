import {
  CREATE_PROJECT,
  DELETE_PROJECT,
  UPDATE_PROJECT,
  ASSIGN_STUDENTS,
  SET_SELECTED_PROJECT,
  CLEAR_SELECTED_PROJECT,
} from "./projectActionTypes";

import {
  createContext,
  useState,
  useEffect,
  useContext,
  useReducer,
} from "react";

// Reducer function - centralised state logic
function projectsReducer(state, action) {
  switch (action.type) {
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project.id !== action.projectId
        ),
      };

    case CREATE_PROJECT:
      const newProject = {
        id: action.id,
        title: action.title,
        description: action.description,
        assignedStudents: [],
      };
      return { ...state, projects: [...state.projects, newProject] };

    case UPDATE_PROJECT:
      return {
        ...state,
        projects: state.projects.map((project) => {
          if (project.id === action.projectId) {
            return {
              ...project,
              title: action.title,
              description: action.description,
            };
          }
          return project;
        }),
      };

    case ASSIGN_STUDENTS:
      return {
        ...state,
        projects: state.projects.map((project) => {
          if (project.id === action.projectId) {
            return {
              ...project,
              assignedStudents: action.students,
            };
          }
          return project;
        }),
      };

    case SET_SELECTED_PROJECT:
      return {
        ...state,
        selectedProject: state.projects.find(
          (project) => project.id === action.projectId
        ),
      };

    case CLEAR_SELECTED_PROJECT:
      return {
        ...state,
        selectedProject: null,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

// Initialize state with localStorage
function initializeState(initialState) {
  const savedProjects = localStorage.getItem("projects");
  if (savedProjects) {
    return {
      ...initialState,
      projects: JSON.parse(savedProjects),
    };
  }
  return initialState;
}

const ProjectsContext = createContext();

export function ProjectsProvider({ children }) {
  const [state, dispatch] = useReducer(
    projectsReducer,
    {
      projects: [],
      selectedProject: null,
    },
    initializeState
  );

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(state.projects));
  }, [state.projects]);

  const handleCreateProject = (projectData) => {
    const maxId =
      state.projects.length > 0
        ? Math.max(...state.projects.map((project) => project.id))
        : 0;
    dispatch({
      type: CREATE_PROJECT,
      id: maxId + 1,
      title: projectData.title,
      description: projectData.description,
    });
  };

  const handleDeleteProject = (projectId) => {
    dispatch({ type: DELETE_PROJECT, projectId: projectId });
  };

  const handleEditProject = (projectId) => {
    dispatch({ type: SET_SELECTED_PROJECT, projectId: projectId });
  };

  const handleUpdateProject = (projectData) => {
    dispatch({
      type: UPDATE_PROJECT,
      projectId: state.selectedProject.id,
      title: projectData.title,
      description: projectData.description,
    });
  };

  const handleAssignStudents = (projectId) => {
    dispatch({ type: SET_SELECTED_PROJECT, projectId: projectId });
  };

  const handleSaveAssignedStudents = (students) => {
    dispatch({
      type: ASSIGN_STUDENTS,
      projectId: state.selectedProject.id,
      students: students,
    });
    console.log("Students saved successfully!");
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects: state.projects,
        selectedProject: state.selectedProject,
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
