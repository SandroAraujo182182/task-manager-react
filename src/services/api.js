const API_URL = "http://localhost:3000/tasks";

export const getTasks = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const addTask = async (task) => {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
};

export const deleteTask = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};

export const toggleTask = async (task) => {
  await fetch(`${API_URL}/${task.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...task,
      completed: !task.completed,
    }),
  });
};
