import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITodo, ITodoState } from './todo.types';

const initialState: ITodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodo>) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => {
        return todo.id !== action.payload;
      });
    },
    removeAll: (state) => {
      state.todos = [];
    },
    toggleFinish: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          todo.isDone = !todo.isDone;
        }

        return todo;
      });
    },
  },
});

export default todoSlice.reducer;
export const { addTodo, removeTodo, toggleFinish } = todoSlice.actions;
