import { createContext, useContext, useEffect, useState } from "react";
import { createTodo, fetchTodos, updateTodo } from "../api/todos";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);

  // fetch todo
  useEffect(() => {
    async function getTodos() {
      const todos = await fetchTodos();
      setTodos(todos);
    }
    getTodos();
  }, []);

  // add Todo
  async function addTodo(title) {
    const newTodo = await createTodo(title);
    setTodos((prev) => [...prev, newTodo]);
  }

  // update todo
  async function handleUpdate(id, updates) {
    const todo = todos.find((todo) => todo._id === id);
    const updated = await updateTodo(id, {
      ...todo,
      ...updates,
    });
    setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));
  }

  return (
    <TodoContext.Provider value={{ todos, addTodo, handleUpdate }}>
      {children}
    </TodoContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTodos = () => useContext(TodoContext);
