import { useEffect, useState } from "react";
import { getTasks } from "./services/api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const completedTasks = tasks.filter((task) => task.completed).length;

  const pendingTasks = tasks.length - completedTasks;

  const today = new Date().toISOString().split("T")[0];

  const overdueTasks = tasks.filter(
    (task) =>
      !task.completed &&
      task.dueDate &&
      task.dueDate < today
  ).length;

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "pending" && !task.completed) ||
      (filter === "completed" && task.completed);

    return matchesSearch && matchesFilter;
  });

  return (
    <main className={`app ${darkMode ? "dark-mode" : ""}`}>
      <div className="container">

        <header className="header">

          <ThemeToggle
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />

          <div>
            <p className="eyebrow">ORGANIZE SUA ROTINA</p>

            <h1>Task Manager</h1>

            <p className="subtitle">
              Gerencie suas tarefas de forma simples e eficiente.
            </p>
          </div>

          <div className="stats">

            <div className="stat">
              <strong>{tasks.length}</strong>
              <span>Total</span>
            </div>

            <div className="stat">
              <strong>{pendingTasks}</strong>
              <span>Pendentes</span>
            </div>

            <div className="stat">
              <strong>{completedTasks}</strong>
              <span>Concluídas</span>
            </div>

            <div className="stat overdue-stat">
              <strong>{overdueTasks}</strong>
              <span>Atrasadas</span>
            </div>

          </div>
        </header>

        <section className="task-section">

          <h2>Adicionar tarefa</h2>

          <TaskForm onTaskAdded={loadTasks} />

        </section>

        <section className="task-section">

          <div className="section-header">

            <h2>Minhas tarefas</h2>

            <span>
              {filteredTasks.length} tarefas
            </span>

          </div>

          <div className="task-controls">

            <input
              type="text"
              placeholder="Pesquisar tarefa..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="filters">

              <button
                className={filter === "all" ? "active" : ""}
                onClick={() => setFilter("all")}
              >
                Todas
              </button>

              <button
                className={filter === "pending" ? "active" : ""}
                onClick={() => setFilter("pending")}
              >
                Pendentes
              </button>

              <button
                className={filter === "completed" ? "active" : ""}
                onClick={() => setFilter("completed")}
              >
                Concluídas
              </button>

            </div>

          </div>

          <TaskList
            tasks={filteredTasks}
            onUpdate={loadTasks}
          />

        </section>

      </div>
    </main>
  );
}

export default App;