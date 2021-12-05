const Column = require("./column.model");

const createColumn = (column) =>
  column.map(({ id, title, order }) => id
    ? Column.toResponse({ id, title, order })
    : new Column(title, order));

module.exports = { createColumn };