const toggleBtn = document.getElementById("toggle-theme");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const darkMode = document.body.classList.contains("dark");
  toggleBtn.textContent = darkMode ? "☀️ Modo Claro" : "🌙 Modo Escuro";
});
