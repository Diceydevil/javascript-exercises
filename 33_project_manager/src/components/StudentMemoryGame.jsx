import { useState, useEffect } from "react";

function StudentMemoryGame(props) {
  console.log("StudentMemoryGame component is rendering");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    console.log("useEffect hook is running");
    fetch("https://randomuser.me/api/?results=12")
      .then((response) => response.json())
      .then((data) => {
        console.log("API Data:", data);
      });
  }, []);

  return (
    <div>
      <h2>Student Memory Game - Coming Soon!</h2>
    </div>
  );
}

export default StudentMemoryGame;
