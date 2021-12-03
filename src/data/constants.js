const path = require("path");

const USER_TYPE = 'USER_TYPE'
const BOARD_TYPE = 'BOARD_TYPE'
const TASK_TYPE = 'TASK_TYPE'
const PATH_USER = path.join(`${__dirname}/user.json`)
const PATH_BOARD = path.join(`${__dirname}/board.json`)
const PATH_TASK = path.join(`${__dirname}/task.json`)

module.exports = {
  USER_TYPE,
  BOARD_TYPE,
  TASK_TYPE,
  PATH_USER,
  PATH_BOARD,
  PATH_TASK
}