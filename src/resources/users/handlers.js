const { v4: uuidv4 } = require('uuid')
const usersService = require('./service');
const tasksService = require('../tasks/service');

const getUsers = (req, reply) => {
  const users = usersService.getAllUsers();
  const usersShown = users.map(({ id, login, name }) => ({id, login, name}));
  
  reply.send(usersShown);
}

const getUser = (req, reply) => {
  const { id } = req.params
  const users = usersService.getAllUsers();
  const user = users.find((elem) => elem.id === id)

  reply.send(user)
}

const addUser = (req, reply) => {
  const { name, login, password} = req.body
  const user = {
    id: uuidv4(),
    name,
    login,
    password
  }
  usersService.addInUsers(user);

  const userShown = {id: user.id, name: user.name, login: user.login};

  reply.code(201).send(userShown)
}

const deleteUser = (req, reply) => {
  const { id } = req.params
  const tasks = tasksService.getAllTasks();
  const tasksWithId = tasks.filter(elem => elem.userId === id);
  if (tasksWithId.length) {
    tasksWithId.forEach(task => {
      const taskNew = task;
      taskNew.userId = null;
      tasksService.changeInTasks(task.id, taskNew);
    })
  }
  usersService.deleteInUsers(id);

  reply.send({ message: `User ${id} has been removed` })
}

const updateUser = (req, reply) => {
  const { id } = req.params
  const { name, login, password } = req.body

  usersService.changeInUsers(id, { name, login, password })

  const userShown = { id, name, login };

  reply.send(userShown);
}

module.exports = {
  getUsers,
  getUser,
  addUser,
  deleteUser,
  updateUser,
}