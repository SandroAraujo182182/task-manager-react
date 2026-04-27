import { useEffect, useState } from "react";
import { getTasks } from "./services/api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <TaskForm onTaskAdded={loadTasks} />
      <TaskList tasks={tasks} onUpdate={loadTasks} />
    </div>
  );
}

export default App;
