import { useState } from "react";

function StudentCard(props) {
  return (
    <div
      className="bg-white border border-black rounded-lg p-4 m-4 relative"
      onClick={() => props.onCardClick(props.id)}
    >
      <img
        src={props.image}
        alt={props.name}
        className="w-16 h-16 rounded-full"
      />
      <h2 className="text-xl font-bold">{props.name}</h2>
    </div>
  );
}

export default StudentCard;
