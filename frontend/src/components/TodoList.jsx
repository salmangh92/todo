import { useState } from "react";
import { useTodos } from "../context/TodoContext";
function TodoList() {
  const { todos, handleUpdate } = useTodos();

  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  function startEdit(todo) {
    setEditingId(todo._id);
    setNewTitle(todo.title);
  }

  async function saveEdit(id) {
    await handleUpdate(id, {
      title: newTitle,
    });
    setEditingId(null);
  }

  function cancelEdit() {
    setEditingId(null);
    setNewTitle("");
  }

  if (todos.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-slate-400">
        Noch keine Todos — leg direkt los!
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {todos.map((todo) => (
        <li
          key={todo._id}
          className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 transition hover:border-slate-200"
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() =>
              handleUpdate(todo._id, {
                completed: !todo.completed,
              })
            }
            className="h-4 w-4 shrink-0 cursor-pointer accent-indigo-600"
          />
          {editingId === todo._id ? (
            <>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="flex-1 rounded-md border border-slate-200 px-2 py-1 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
              <button
                onClick={() => saveEdit(todo._id)}
                className="cursor-pointer rounded-md bg-green-600 px-2.5 py-1 text-sm font-medium text-white transition hover:bg-green-700"
              >
                Speichern
              </button>
              <button
                onClick={cancelEdit}
                className="cursor-pointer rounded-md bg-slate-200 px-2.5 py-1 text-sm font-medium text-slate-700 transition hover:bg-slate-300"
              >
                Abbrechen
              </button>
            </>
          ) : (
            <>
              <span
                className={`flex-1 text-sm ${
                  todo.completed
                    ? "text-slate-400 line-through"
                    : "text-slate-800"
                }`}
              >
                {todo.title}
              </span>
              <button
                onClick={() => startEdit(todo)}
                className="cursor-pointer text-sm font-medium text-indigo-600 transition hover:text-indigo-800"
              >
                Bearbeiten
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
