let users = require("./db");

const getAllUsers = () => users;

const addInUsers = (user) => users.push(user);

const deleteInUsers = (id) => {
    users = users.filter((elem) => elem.id !== id)
}

const changeInUsers = (id, newUser) => {
    const userNew = users.find(elem => elem.id === id);
    userNew.name = newUser.name;
    userNew.login = newUser.login;
    userNew.password = newUser.password;
}

module.exports = { getAllUsers, addInUsers, deleteInUsers, changeInUsers};