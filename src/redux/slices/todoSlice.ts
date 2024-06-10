import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
      });
    },

    toggleCompletion: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },

    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, toggleCompletion, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
