const {v4} = require("uuid");
const {
  USER_TYPE,
  BOARD_TYPE,
  TASK_TYPE,
  PATH_USER,
  PATH_BOARD,
  PATH_TASK
} = require('../data/constants')
const user = require('../data/user.json')
const board = require('../data/board.json')
const task = require('../data/task.json')
const {writeDataToFile} = require("./writeDataToFile");

const getDataType = (typeData) => {
  switch (typeData) {
    case USER_TYPE:
      return [user, PATH_USER];
    case BOARD_TYPE:
      return [board, PATH_BOARD];
    case TASK_TYPE:
      return [task, PATH_TASK];
    default:
      return [[], '']
  }
}

const findAll = (typeData) => new Promise((resolve) => {
  resolve(getDataType(typeData)[0])
})

const findById = (typeData, id) => new Promise((resolve) => {
  const data = getDataType(typeData)[0].find(db => db.id === id)
  resolve(data)
})

const create = (typeData, data) => new Promise((resolve) => {
  const newPerson = {id: v4(), ...data}
  const [db, path] = getDataType(typeData)

  db.push(newPerson)

  writeDataToFile(path, db);

  resolve(newPerson)
})

const update = (typeData, id, data) => new Promise((resolve) => {
  const [db, path] = getDataType(typeData)
  const index = db.findIndex((p) => p.id === id)

  if(index < 0) resolve(null)

  db[index] = {id, ...data}
  writeDataToFile(path, db);

  resolve(db[index])
})

const remove = (typeData, id) => new Promise((resolve) => {
  const [db, path] = getDataType(typeData)
  const dbFiltered = db.filter((p) => p.id !== id)

  writeDataToFile(path, dbFiltered);

  resolve('is removed')
})

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
}