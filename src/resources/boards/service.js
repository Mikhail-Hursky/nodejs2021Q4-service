let boards = require("./db");

const getAllBoards = () => boards;

const addInBoards = (board) => boards.push(board);

const deleteInBoards = (id) => {
    boards = boards.filter((elem) => elem.id !== id)
}

const changeInBoards = (id, newBoard) => {
    const boardNew = boards.find(elem => elem.id === id);
    boardNew.title = newBoard.title;
    boardNew.columns = newBoard.columns;
}

module.exports = { getAllBoards, addInBoards, deleteInBoards, changeInBoards};