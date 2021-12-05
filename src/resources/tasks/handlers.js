const { v4: uuidv4 } = require('uuid');
const tasksService = require('./service');
const usersService = require('../users/service');
const boardsService = require('../boards/service');

const getTasks = (req, reply) => {
  reply.send(tasksService.getAllTasks());
}

const getTask = (req, reply) => {
  const { taskId } = req.params
  const tasks = tasksService.getAllTasks();
  const task = tasks.find((elem) => elem.id === taskId);
  if (task) {
    reply.send(task)
  } else {
    reply.code(404);
    reply.send("Not found");
  }
}

const addTask = (req, reply) => {
  const { id } = req.params;
  const { title, order, description } = req.body;
  let { userId, columnId } = req.body;
  const users = usersService.getAllUsers();
  const boards = boardsService.getAllBoards();
  if (!users.filter(elem => elem.id === userId).length) {
    userId = null;
  }
  boards.forEach(board => {
    if (!board.columns.filter(elem => elem.id === columnId).length) {
      columnId = null;
    };
  })
  const task = {
    id: uuidv4(),
    title,
    order,
    description,
    userId,
    boardId: id,
    columnId
  }

  tasksService.addInTasks(task);

  reply.code(201).send(task);
}

const deleteTask = (req, reply) => {
  const { taskId } = req.params

  tasksService.deleteInTasks(taskId);

  reply.send({ message: `Board ${taskId} has been removed` })
}

const updateTask = (req, reply) => {
  const { taskId } = req.params
  const { title, order, description, userId, boardId, columnId } = req.body;

  tasksService.changeInTasks(taskId, { title, order, description, userId, boardId, columnId } );

  reply.send({ taskId, title, order, description, userId, boardId, columnId })
}

module.exports = {
  getTasks,
  getTask,
  addTask,
  deleteTask,
  updateTask,
}