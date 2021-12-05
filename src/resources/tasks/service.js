let tasks = require("./db");

const getAllTasks = () => tasks;

const addInTasks = (task) => tasks.push(task);

const deleteInTasks = (id) => {
    tasks = tasks.filter((elem) => elem.id !== id)
}

const changeInTasks = (id, newTask) => {
    const taskNew = tasks.find(elem => elem.id === id);
    taskNew.title = newTask.title;
    taskNew.order = newTask.order;
    taskNew.description = newTask.description;
    taskNew.userId = newTask.userId;
    taskNew.boardId = newTask.boardId;
    taskNew.columnId = newTask.columnId;
}

module.exports = { getAllTasks, addInTasks, deleteInTasks, changeInTasks};