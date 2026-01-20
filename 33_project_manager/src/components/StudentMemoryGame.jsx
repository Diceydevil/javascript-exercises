import { useState, useEffect } from "react";

function StudentMemoryGame(props) {
  console.log("StudentMemoryGame component is rendering");
  const [students, setStudents] = useState([]);

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

  return (
    <div>
      <h2>Student Memory Game - Coming Soon!</h2>
      <div>
        {students.map((student) => (<p key={student.id}>{student.name}</p>))}
      </div>
    </div>
  );
}

export default StudentMemoryGame;
