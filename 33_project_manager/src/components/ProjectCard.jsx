function ProjectCard(props) {
  return (
    <div className="bg-white border border-black rounded-lg p-4 m-4 relative">
      <h2 className="text-xl font-bold">
        {props.title}
        <span> {props.id}</span>
      </h2>
      <p className="text-gray-600">{props.description}</p>
      <button
        onClick={() => props.onDelete(props.id)}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 rounded w-6 h-6 flex items-center justify-center bg-gray-100 hover:bg-gray-200"
      >
        -
      </button>
    </div>
  );
}

export default ProjectCard;
