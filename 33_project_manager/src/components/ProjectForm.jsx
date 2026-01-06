import { useState } from "react";

function ProjectForm(props) {
  const [title, setTitle] = useState(props.project?.title || "");
  const [description, setDescription] = useState(
    props.project?.description || ""
  );

  const handleSubmit = () => {
    const projectData = {
      title: title,
      description: description,
    };

    if (props.onSave) {
      props.onSave(projectData);
    } else {
      props.onCreateProject(projectData);
    }

    setTitle("");
    setDescription("");
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">
        {props.project ? "EDIT PROJECT" : "NEW PROJECT"}
      </h1>
      <h2 className="text-xl font-bold mb-6">PROJECT DETAILS</h2>

      <label className="block mb-2 font-medium">Project Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-black"
        placeholder=""
      />

      <label className="block mb-2 font-medium">Project Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-8 focus:outline-none focus:ring-2 focus:ring-black resize-none"
        rows="6"
        placeholder=""
      />

      <button
        type="button"
        onClick={handleSubmit}
        className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
      >
        {props.project ? "Save Changes" : "Create Project"}
      </button>
    </div>
  );
}

export default ProjectForm;
