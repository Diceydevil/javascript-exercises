import { useState, useEffect } from "react";
import StudentCard from "./StudentCard";

function StudentMemoryGame(props) {
  console.log("StudentMemoryGame component is rendering");
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [gameStatus, setGameStatus] = useState("Game in progress...");

  useEffect(() => {
    console.log("useEffect hook is running");
    fetch("https://randomuser.me/api/?results=12")
      .then((response) => response.json())
      .then((data) => {
        const studentData = data.results.map((user) => ({
          id: user.login.uuid,
          name: `${user.name.first} ${user.name.last}`,
          image: user.picture.medium,
        }));
        console.log("Parsed students:", studentData);
        setStudents(studentData);
      });
  }, []);

  const shuffleStudents = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleCardClick = (studentId) => {
    if (gameStatus !== "Game in progress...") {
      return;
    }

    console.log("Card clicked:", studentId);

    if (selectedStudents.includes(studentId)) {
      console.log("Game over! You clicked the same card twice!");
      setGameStatus("Game Over!");
      return;
    }

    setSelectedStudents([...selectedStudents, studentId]);
    setStudents(shuffleStudents(students));
    if (selectedStudents.length + 1 === 12) {
      setGameStatus("You Won!");
    }
  };

  return (
    <div>
      <h2>Student Memory Game</h2>
      <p>Score: {selectedStudents.length} / 12</p>
      <p>{gameStatus}</p>
      <div>
        {students.map((student) => (
          <StudentCard
            key={student.id}
            id={student.id}
            name={student.name}
            image={student.image}
            onCardClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
}

export default StudentMemoryGame;
