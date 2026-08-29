import { useState } from "react";
import { useTodos } from "../context/TodoContext";

function TodoForm() {
  const [title, setTitle] = useState("");
  const { addTodo } = useTodos();

  function handleSubmit(e) {
    e.preventDefault();
    addTodo(title);
    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Füg eine Todo hinzu..."
        className="flex-1 rounded-lg border border-slate-200 px-4 py-2 text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
      />
      <button
        type="submit"
        className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-700 active:bg-indigo-800"
      >
        Hinzufügen
      </button>
    </form>
  );
}

export default TodoForm;
