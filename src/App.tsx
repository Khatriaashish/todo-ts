import { AppDispatch, RootState } from "./redux/store";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  deleteTodo,
  toggleCompletion,
} from "./redux/slices/todoSlice";
import "./App.scss";

const App: FC = () => {
  const [input, setInput] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const todos = useSelector((state: RootState) => state.todos.todos);
  // const filter = useSelector((state: RootState) => state.filter.filter);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return todo;
    if (filter === "pending") return !todo.completed;
    if (filter === "completed") return todo.completed;
  });

  const handleAddTodo = () => {
    if (input.trim().length > 0) {
      dispatch(addTodo(input));
      setInput("");
    }
  };

  return (
    <>
      <h1>Todo App</h1>
      <div className="todo-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add Todo..."
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      {/* <div className="todo-filter">
        <label>filter: </label>
        <select
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div> */}
      <hr />
      <div className="todo-list">
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="clickable"
              onClick={() => dispatch(toggleCompletion(todo.id))}
            >
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.text}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(deleteTodo(todo.id));
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;
