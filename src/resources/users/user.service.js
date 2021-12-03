const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getUserBuId = (id) => usersRepo.getUserBuId(id)

const createUser = (user) => usersRepo.createUser(user)

const updateUser = (id, user) => usersRepo.updateUser(id, user)

const deleteUser = (id) => usersRepo.deleteUser(id)

module.exports = { getAll, getUserBuId, createUser, updateUser, deleteUser };
