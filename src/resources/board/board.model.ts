import { v4 as uuid } from 'uuid';
import {Column} from './column.model';

export class Board {
  /**
   * Board class represents a custom structure of in-memory database instance
   * The board represents an object that contains the columns and has a title
   * Every board has its unique identificator created by v4 uuid
   */
  id: string;

  title: string;

  columns: Column[];

  constructor(title: string, columns: Column[]) {
    this.id = uuid();
    this.title = title;
    this.columns = columns;
  }
}
