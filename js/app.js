document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.querySelector('.theme-toggle');
  const root = document.documentElement;

  themeToggle.addEventListener('click', () => {
    if (root.getAttribute('data-theme') === 'dark') {
      root.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  });

  if (localStorage.getItem('theme') === 'dark') {
    root.setAttribute('data-theme', 'dark');
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const root = document.documentElement;

  // Detectar tema inicial
  let darkMode = localStorage.getItem("darkMode") === "true";

  // Actualizar el tema
  const updateTheme = () => {
    if (darkMode) {
      root.style.setProperty("--primary-color", "#4B0082");
      root.style.setProperty("--secondary-color", "#8A2BE2");
      root.style.setProperty("--background-light", "#121212");
      root.style.setProperty("--text-light", "#E0E0E0");
      root.style.setProperty("--text-dark", "#ffffff");
      themeToggle.textContent = "☀️"; // Modo claro
    } else {
      root.style.setProperty("--primary-color", "#0A192F");
      root.style.setProperty("--secondary-color", "rgb(69,142,179)");
      root.style.setProperty("--background-light", "#F5F7FA");
      root.style.setProperty("--text-light", "#EDEDED");
      root.style.setProperty("--text-dark", "#333333");
      themeToggle.textContent = "🌙"; // Modo oscuro
    }
  };

  // Alternar tema
  themeToggle.addEventListener("click", () => {
    darkMode = !darkMode;
    localStorage.setItem("darkMode", darkMode);
    updateTheme();
  });

  // Aplicar el tema al cargar
  updateTheme();
});
