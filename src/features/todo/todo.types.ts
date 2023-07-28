export interface ITodo {
  id: number;
  isDone: boolean;
  value: string;
}

export interface ITodoState {
  todos: ITodo[];
}
