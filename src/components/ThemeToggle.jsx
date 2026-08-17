function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      className="theme-toggle"
      onClick={() => setDarkMode((current) => !current)}
    >
      {darkMode ? "☀️ Claro" : "🌙 Escuro"}
    </button>
  );
}

export default ThemeToggle;