const {v4} = require("uuid");

class Column {
  constructor(title, order) {
    this.id = v4();
    this.tittle = title;
    this.order = order;
  }

  static toResponse(column) {
    const {id, tittle, order} = column;
    return {id, tittle, order};
  }
}

module.exports = Column;