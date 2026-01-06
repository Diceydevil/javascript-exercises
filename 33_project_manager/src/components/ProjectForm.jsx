import { useState } from "react";

function ProjectForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <div>
      {/* Header */}
      <h1 className="text-4xl font-bold mb-8">NEW PROJECT</h1>

      {/* Section Title */}
      <h2 className="text-xl font-bold mb-6">PROJECT DETAILS</h2>

      {/* Project Title */}
      <label className="block mb-2 font-medium">Project Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-black"
        placeholder=""
      />

      {/* Project Description */}
      <label className="block mb-2 font-medium">Project Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-8 focus:outline-none focus:ring-2 focus:ring-black resize-none"
        rows="6"
        placeholder=""
      />

      {/* Create Project Button */}
      <button
        type="button"
        className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
      >
        Create Project
      </button>
    </div>
  );
}

export default ProjectForm;
