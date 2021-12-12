import {User}  from './users/user.model';
import {Board} from './boards/board.model';
import {Column} from './boards/column.model';
import {Task} from "./tasks/task.model";

const usersArr: User[] = [];
const boardsArr: Board[] = [];
const tasksArr: Task[] = [];

// This file contains so much file because in next updatest all of this
// is gonna be replaced with accessing to a real database
//

// utils

/**
 * Delete a specific tasks which id matches the param
 * @param boardId id of Board
 * @returns void
 */

function deleteTasksByBoardId(boardId: string): void {
  for (let i = tasksArr.length - 1; i >= 0; i -= 1) {
    const task = tasksArr[i];
    if (task.boardId === boardId) {
      if (tasksArr.length === 1) {
        tasksArr.splice(-1);
      } else {
        tasksArr.splice(i, 1);
      }
    }
  }
}
/**
 * Set all users's tasks userId to null, representing a deletion
 * @param userId id of User
 * @returns true when done
 */
function nullifyTasksByUserId(userId: string): boolean {
  for (let i = 0; i < tasksArr.length; i += 1) {
    const task = tasksArr[i];
    if (task.userId === userId) {
      task.userId = null;
    }
  }
  return true;
}
/**
 * get all database info
 * @returns All memory data stored in one object
 */
function getAll(): object {
  return {
    users: usersArr,
    boards: boardsArr,
    tasks: tasksArr,
  };
}

/**
 * get all Users info from database
 * @returns an array of Users
 */
function getAllUsers(): User[] {
  return usersArr;
}
/**
 * get a specific users by it's unique id
 * @param id users identificator
 * @returns users on success, or false if not found
 */
function getUserById(id: string): User | false {
  for (let i = 0; i < usersArr.length; i += 1) {
    const user = usersArr[i];
    if (user.id === id) {
      return user;
    }
  }
  return false;
}
/**
 * Add a users into a database with specific values
 * @param name a name of a users
 * @param login a login in string
 * @param password a password, keeps private
 * @returns newly created User instance
 */
function createNewUser(name: string, login: string, password: string): User {
  const user = new User(name, login, password);
  usersArr.push(user);
  return user;
}
/**
 * delete a users by it's unique identificator
 * @param id users identificator
 * @returns true on success, false if not found
 */
function deleteUserById(id: string): boolean {
  for (let i = 0; i < usersArr.length; i += 1) {
    const user = usersArr[i];
    if (user.id === id) {
      nullifyTasksByUserId(id);
      if (usersArr.length === 1) {
        usersArr.splice(-1);
      } else if (usersArr.length > 0) {
        usersArr.splice(i, 1);
      }
      return true;
    }
  }
  return false;
}
/**
 * update a users and its stored values by its unique identifier
 * @param id users identificator
 * @param name new name for a users
 * @param login new login in string
 * @param password new password, keeps private
 * @returns an updated User instance
 */
function updateUserById(
  id: string,
  name: string,
  login: string,
  password: string
): User | false {
  for (let i = 0; i < usersArr.length; i += 1) {
    const user = usersArr[i];
    if (user.id === id) {
      if (name !== undefined) user.name = name;
      if (login !== undefined) user.login = login;
      if (password !== undefined) user.password = password;
      return user;
    }
  }
  return false;
}

/**
 * get all boards from database
 * @returns an array of Board 
 */
function getAllBoards(): Board[] {
  return boardsArr;
}
/**
 * get a specific boards by it's unique id
 * @param id boards identificator
 * @returns boards on success, or false if not found
 */
function getBoardById(id: string): Board | boolean {
  for (let i = 0; i < boardsArr.length; i += 1) {
    const board = boardsArr[i];
    if (board.id === id) {
      return board;
    }
  }
  return false;
}
/**
 * create new boards with columns
 * @param title a title for the boards
 * @param columns an array of Column instances
 * @returns newly created Board instance
 */
function createNewBoard(title: string, columns: Column[]): Board {
  const board = new Board(title, columns);
  boardsArr.push(board);
  return board;
}
/**
 * delete a boards using unique identificator
 * @param id unique boards identificator
 * @returns true on success, false on not found
 */
function deleteBoardById(id: string) {
  deleteTasksByBoardId(id);
  for (let i = 0; i < boardsArr.length; i += 1) {
    const board = boardsArr[i];
    if (board.id === id) {
      deleteTasksByBoardId(id);
      if (boardsArr.length === 1) {
        boardsArr.splice(-1);
      } else if (boardsArr.length > 0) {
        boardsArr.splice(i, 1);
      }
      return true;
    }
  }
  return false;
}
/**
 * update a boards by its unique identificator
 * @param id unique boards identificator
 * @param title new title for the boards
 * @param columns new array of Column instances
 * @returns updated Board instance, or false on not found
 */
function updateBoardById(
  id: string,
  title: string,
  columns: Column[]
): Board | boolean {
  for (let i = 0; i < boardsArr.length; i += 1) {
    const board = boardsArr[i];
    if (board.id === id) {
      if (title !== undefined) board.title = title;
      if (columns !== undefined) board.columns = columns;
      return board;
    }
  }
  return false;
}
/**
 * get all tasks stored in database
 * @param boardId unique boards identificator
 * @returns an array of all Task instances in database
 */
function getAllTasks(boardId: string): Task[] {
  const resultArr = [];
  for (let i = 0; i < tasksArr.length; i += 1) {
    const task = tasksArr[i];
    if (task.boardId === boardId) {
      resultArr.push(task);
    }
  }
  return resultArr;
}
/**
 * get tasks by its unique identificator and boards unique identificator
 * @param id unique tasks identificator
 * @param boardId unique boards identificator
 * @returns tasks instance on success, or false on not found
 */
function getTaskById(id: string, boardId: string): Task | boolean {
  for (let i = 0; i < tasksArr.length; i += 1) {
    const task = tasksArr[i];
    if (task.id === id && task.boardId === boardId) {
      return task;
    }
  }
  return false;
}
/**
 * create new tasks and save it to database
 * @param title a title for the tasks
 * @param order an order of the tasks
 * @param description tasks description
 * @param userId unique users identificator
 * @param boardId unique boards identificator
 * @param columnId unique column identificator
 * @returns newly created Task instance
 */
function createNewTask(
  title: string,
  order: string,
  description: string,
  userId: string,
  boardId: string,
  columnId: string
): Task {
  const task = new Task(title, order, description, userId, boardId, columnId);
  tasksArr.push(task);
  return task;
}
/**
 * delete a tasks by its unique identificator and its boards identificator
 * @param id unique tasks identificator
 * @param boardId unique boards identificator
 * @returns true on success, false on not found
 */
function deleteTaskById(id: string, boardId: string):boolean {
  for (let i = 0; i < tasksArr.length; i += 1) {
    const task = tasksArr[i];
    if (task.id === id && task.boardId === boardId) {
      if (tasksArr.length === 1) {
        tasksArr.splice(-1);
      } else if (tasksArr.length > 0) {
        tasksArr.splice(i, 1);
      }
      return true;
    }
  }
  return false;
}
/**
 * update tasks by its unique identificator and its boards identificator
 * @param id unique tasks identificator
 * @param title a title of the tasks
 * @param order an order of the tasks
 * @param description tasks description
 * @param userId unique User identificator
 * @param boardId unique Board identificator
 * @param columnId unique Column identificator
 * @returns updated Task instance, or false if not found 
 */
function updateTaskById(
  id: string,
  title: string,
  order: string,
  description: string,
  userId: string,
  boardId: string,
  columnId: string
): Task|boolean {
  const i = tasksArr.findIndex((task) => task.id === id && task.boardId === boardId);
  const task = tasksArr[i];
  if (i !== -1) {
    if (title !== undefined) task.title = title;
    if (order !== undefined) task.order = order;
    if (description !== undefined) task.description = description;
    if (userId !== undefined) task.userId = userId;
    if (boardId !== undefined) task.boardId = boardId;
    if (columnId !== undefined) task.columnId = columnId;
    return task;
  }
  return false;
}

export {
  getAllUsers,
  getUserById,
  createNewUser,
  deleteUserById,
  updateUserById,

  getAllBoards,
  getBoardById,
  createNewBoard,
  deleteBoardById,
  updateBoardById,

  getAllTasks,
  getTaskById,
  createNewTask,
  deleteTaskById,
  updateTaskById,

  getAll,
};
