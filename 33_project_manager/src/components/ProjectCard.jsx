function ProjectCard(props) {
  return (
    <div className="bg-white border border-black rounded-lg p-4 m-4 relative">
      <h2 className="text-xl font-bold">{props.title}</h2>
      <p className="text-gray-600">{props.description}</p>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex gap-2">
        <button
          onClick={() => props.onAssignStudents(props.id)}
          className="rounded w-6 h-6 flex items-center justify-center"
        >
          <span> ♟</span>
        </button>
        <button
          onClick={() => props.onEdit(props.id)}
          className="rounded w-6 h-6 flex items-center justify-center"
        >
          <span className="text-black">✎</span>
        </button>
        <button
          onClick={() => props.onDelete(props.id)}
          className="rounded w-6 h-6 flex items-center justify-center"
        >
          <span>⛌</span>
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;
