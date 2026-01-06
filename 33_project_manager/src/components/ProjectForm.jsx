import { useState } from "react";

function ProjectForm() {
  const [title, setTitle] = useState("");
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Add a New Project</h2>
      <label className="block mb-2 font-medium">Project Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        placeholder="Enter Project Title"
        required
      />
    </div>
  );
}

export default ProjectForm;
