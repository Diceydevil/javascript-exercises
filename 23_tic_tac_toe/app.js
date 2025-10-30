// Gameboard
const Gameboard = (() => {
    const board = Array(9).fill("");

    const getBoard = () => [...board];

    const getCell = (index) => {
        if (index < 0 || index > 8) throw new Error("Index out of bounds");
        return board[index];
    };

    const setCell = (index, mark) => {
        if (index < 0 || index > 8) throw new Error("Index out of bounds");
        if (mark !== "X" && mark !== "O") throw new Error("Invalid mark");
        if (board[index] !== "") return false; // Cell already taken
        board[index] = mark;
        return true;
    };

    const reset = () => {
        for (let i = 0; i < board.length; i++) board[i] = "";
    };

    return { getBoard, getCell, setCell, reset };
})();

Gameboard.setCell(0, "X");
Gameboard.setCell(4, "O");

console.log("Board after two moves:", Gameboard.getBoard());
