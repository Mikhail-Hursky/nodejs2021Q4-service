import { v4 as uuid } from 'uuid';

export class Task {
  /**
   * Task class represents a custom structure of in-memory database instance
   * The task represents an object that contains a title, description and stores 
   * a user, board and column links using their unique identificators
   * Every task has its unique identificator created by v4 uuid
   */
  id: string;

  title: string;

  order: string;

  description: string;

  userId: string | null;

  boardId: string;

  columnId: string;

  constructor(
    title: string,
    order: string,
    description: string,
    userId: string,
    boardId: string,
    columnId: string
  ) {
    this.id = uuid();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}
