const {findAll, findById, create, update, remove} = require("../../utils/workWithDb");
const {BOARD_TYPE} = require("../../data/constants");

const getAll = async () => findAll(BOARD_TYPE);
const getById = async (id) => findById(BOARD_TYPE, id);
const createBoard = async (board) => create(BOARD_TYPE, board);
const updateBoard = async (id, board) => update(BOARD_TYPE, id, board);
const deleteBoard = async (id) => remove(BOARD_TYPE, id);


module.exports = { getAll, getById, createBoard, updateBoard, deleteBoard };