const BASE_URL = "http://localhost:5001/todos";

// fetch alle Todos
function handleResponse(res) {
  if (!res.ok) {
    throw new Error(`HTTP-Fehler: ${res.status} `);
  }
  return res.json();
}

export async function fetchTodos() {
  const res = await fetch(BASE_URL);
  return handleResponse(res);
}

// eine todo erstellen

export async function createTodo(title) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  return handleResponse(res);
}

// eine todo aktualisieren

export async function updateTodo(id, update) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(update),
  });

  return handleResponse(res);
}

//
