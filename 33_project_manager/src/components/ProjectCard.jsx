function ProjectCard(props) {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 m-4">
      <h2 className="text-xl font-bold">
        {props.title}
        <span className="text-gray-500">{props.id}</span>
      </h2>
      <p className="text-gray-600">{props.description}</p>
    </div>
  );
}

export default ProjectCard;
