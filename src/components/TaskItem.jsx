import { deleteTask, toggleTask } from "../services/api";

function TaskItem({ task, onUpdate }) {
  return (
    <li>
      <span
        onClick={async () => {
          await toggleTask(task);
          onUpdate();
        }}
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          cursor: "pointer",
        }}
      >
        {task.title}
      </span>

      <button
        onClick={async () => {
          await deleteTask(task.id);
          onUpdate();
        }}
      >
        ❌
      </button>
    </li>
  );
}

export default TaskItem;
