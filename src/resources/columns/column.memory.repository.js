const {findAll} = require("../../utils/workWithDb");
const {BOARD_TYPE} = require("../../data/constants");

const getAll = async () => findAll(BOARD_TYPE);


module.exports = { getAll };