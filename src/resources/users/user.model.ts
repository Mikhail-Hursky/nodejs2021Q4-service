import { v4 as uuid } from 'uuid';

export class User {
  /**
   * User class represents a custom structure of in-memory database instance
   * The users represents a person that has a name and login-password pair to login
   * Every users has its unique identificator created by v4 uuid
   */
  id: string;

  name: string;

  login: string;

  password: string | undefined;

  constructor(name: string, login: string, password: string) {
    this.id = uuid();
    this.name = name;
    this.login = login;
    this.password = password;
  }
}

