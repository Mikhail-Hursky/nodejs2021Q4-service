const boardRepo = require('./board.memory.repository');

const getAll = () => boardRepo.getAll();
const getBoardById = (id) => boardRepo.getById(id);
const createBoard = (board) => boardRepo.createBoard(board);
const updateBoard = (id, board) => boardRepo.updateBoard(id, board);
const deleteBoard = (id) => boardRepo.deleteBoard(id);


module.exports = { getAll, getBoardById, createBoard, updateBoard, deleteBoard };