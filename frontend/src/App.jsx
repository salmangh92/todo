import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-100 via-white to-purple-100 px-4 py-10">
      <div className="mx-auto w-full max-w-md">
        <h1 className="mb-6 text-center text-3xl font-bold text-slate-800">
          Meine Todos
        </h1>
        <div className="rounded-2xl bg-white p-6 shadow-xl shadow-indigo-100">
          <TodoForm />
          <TodoList />
        </div>
      </div>
    </div>
  );
}

export default App;
