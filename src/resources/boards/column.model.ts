/**
   * Column type represents a custom structure of in-memory database instance
   * The column represents an object that contains an id, title and order
   * Every column has its id
   */
export type Column = {
    id: string;
    title: string;
    order: string;
  };