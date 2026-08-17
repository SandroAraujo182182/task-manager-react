import { useState } from "react";
import { deleteTask, toggleTask, updateTask } from "../services/api";

function TaskItem({ task, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedPriority, setEditedPriority] = useState(
    task.priority || "medium"
  );
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate || "");

  const handleToggle = async () => {
    await toggleTask(task);
    onUpdate();
  };

  const handleDelete = async () => {
    await deleteTask(task.id);
    onUpdate();
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    if (!editedTitle.trim()) return;

    await updateTask(task.id, {
      ...task,
      title: editedTitle.trim(),
      priority: editedPriority,
      dueDate: editedDueDate,
    });

    setIsEditing(false);
    onUpdate();
  };

  const formatDate = (date) => {
    if (!date) return "Sem prazo";

    const [year, month, day] = date.split("-");

    return `${day}/${month}/${year}`;
  };

  const priorityLabel = {
    low: "Baixa",
    medium: "Média",
    high: "Alta",
  };

  const isOverdue =
    !task.completed &&
    task.dueDate &&
    task.dueDate < new Date().toISOString().split("T")[0];

  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      {isEditing ? (
        <form className="edit-form" onSubmit={handleEdit}>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            autoFocus
          />

          <select
            value={editedPriority}
            onChange={(e) => setEditedPriority(e.target.value)}
          >
            <option value="low">Baixa prioridade</option>
            <option value="medium">Média prioridade</option>
            <option value="high">Alta prioridade</option>
          </select>

          <input
            type="date"
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
          />

          <button type="submit">Salvar</button>

          <button
            type="button"
            className="cancel-button"
            onClick={() => {
              setEditedTitle(task.title);
              setEditedPriority(task.priority || "medium");
              setEditedDueDate(task.dueDate || "");
              setIsEditing(false);
            }}
          >
            Cancelar
          </button>
        </form>
      ) : (
        <>
          <div className="task-content">
            <button
              className={`check-button ${
                task.completed ? "checked" : ""
              }`}
              onClick={handleToggle}
              aria-label={
                task.completed
                  ? "Marcar como pendente"
                  : "Marcar como concluída"
              }
            >
              {task.completed ? "✓" : ""}
            </button>

            <div className="task-info">
              <span className="task-title">{task.title}</span>

              <div className="task-meta">
                <span
                  className={`priority priority-${
                    task.priority || "medium"
                  }`}
                >
                  {priorityLabel[task.priority || "medium"]}
                </span>

                <span
                  className={`due-date ${isOverdue ? "overdue" : ""}`}
                >
                  {formatDate(task.dueDate)}
                </span>
              </div>
            </div>
          </div>

          <div className="task-actions">
            <button
              className="edit-button"
              onClick={() => setIsEditing(true)}
            >
              Editar
            </button>

            <button
              className="delete-button"
              onClick={handleDelete}
            >
              Excluir
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default TaskItem;