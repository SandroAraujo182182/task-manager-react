import { useState } from "react";
import { addTask } from "../services/api";

function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    await addTask({
      title: title.trim(),
      completed: false,
      priority,
      dueDate,
    });

    setTitle("");
    setPriority("medium");
    setDueDate("");

    onTaskAdded();
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          type="text"
          placeholder="Nova tarefa..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Baixa prioridade</option>
          <option value="medium">Média prioridade</option>
          <option value="high">Alta prioridade</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button type="submit">Adicionar</button>
      </div>
    </form>
  );
}

export default TaskForm;
