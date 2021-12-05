const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');
const columnService = require("../columns/column.service");

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll()

  res.type('application/json').status(200).json(boards.map(Board.toResponse));
});

router.route('/:boardId').get(async (req, res) => {
  const { boardId } = req.params
  const board = await boardService.getBoardById(boardId)

  if (!board) {
    res.type('application/json').status(404).json()
    return;
  }

  res.type('application/json').status(200).json(Board.toResponse(board));
});

router.route('/').post(async (req, res) => {
  const { title, columns } = req.body

  if (!title) {
    res.type('application/json').send({message: 'Tittle board is required'})
    return;
  }

  if (!columns || !Array.isArray(columns)) {
    res.type('application/json').send({message: 'The required column has an array type'})
    return;
  }

  const column = columnService.createColumn(columns)

  const board = await boardService.createBoard(new Board(title, column));

  res.type('application/json').status(201).json(Board.toResponse(board));
});

router.route('/:boardId').put(async (req, res) => {
  const { boardId } = req.params
  const { title, columns } = req.body

  if (!title) {
    res.type('application/json').send({message: 'Tittle board is required'})
    return;
  }
  if (!columns || !Array.isArray(columns)) {
    res.type('application/json').send({message: 'The required column has an array type'})
    return;
  }

  const column = columnService.createColumn(columns)

  const board = await boardService.updateBoard(boardId, { title, column })

  if (!board) {
    res.type('application/json').status(403).send({message: 'Board not founded'})
    return;
  }

  res.type('application/json').status(200).json(Board.toResponse(board));
});

router.route('/:boardId').delete(async (req, res) => {
  const { boardId } = req.params

  const message = await boardService.deleteBoard(boardId)

  res.type('application/json').status(200).json({message: `Board ${message}`});
});


module.exports = router;
