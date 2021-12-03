const {findAll, findById, create, update, remove} = require("../../utils/workWithDb");
const {USER_TYPE} = require("../../data/constants");

const getAll = async () => findAll(USER_TYPE);

const getUserBuId = async (id) => findById(USER_TYPE, id);

const createUser = async (user) => create(USER_TYPE, user);

const updateUser = async (id, user) => update(USER_TYPE, id, user);

const deleteUser = async (id) => remove(USER_TYPE, id);

module.exports = {getAll, getUserBuId, createUser, updateUser, deleteUser};
