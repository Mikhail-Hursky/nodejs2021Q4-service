const {v4} = require("uuid");

class Board {
  constructor(title, columns) {
    this.id = v4();
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board) {
    const {id, title, columns} = board;
    return {id, title, columns};
  }
}

module.exports = Board;