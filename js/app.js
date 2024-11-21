document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.querySelector('.theme-toggle');
  const html = document.documentElement;
  const typingText = document.querySelector('.typing-text');
  const navLinks = document.querySelectorAll('.nav-links a'); // Seleccionar enlaces del navbar
  const textArray = ["Desarrollador Web", "Backend Developer", "Frontend Enthusiast"];
  let textIndex = 0;
  let charIndex = 0;
  typingText.textContent = "";

  // Detectar tema inicial desde localStorage
  let darkMode = localStorage.getItem("darkMode") === "true";
  html.classList.toggle("dark-mode", darkMode);

  // Actualizar botón de tema
  const updateThemeIcon = () => {
    themeToggle.textContent = darkMode ? "☀️" : "🌙";
  };

  // Alternar tema
  themeToggle.addEventListener("click", () => {
    darkMode = !darkMode;
    localStorage.setItem("darkMode", darkMode);
    html.classList.toggle("dark-mode", darkMode);
    updateThemeIcon();
  });

  // Configurar icono inicial del tema
  updateThemeIcon();

  // Efecto typing
  const type = () => {
    if (charIndex < textArray[textIndex].length) {
      typingText.textContent += textArray[textIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, 100);
    } else {
      setTimeout(erase, 2000);
    }
  };

  const erase = () => {
    if (charIndex > 0) {
      typingText.textContent = textArray[textIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, 50);
    } else {
      textIndex = (textIndex + 1) % textArray.length;
      setTimeout(type, 1000);
    }
  };

  // Iniciar el efecto typing
  setTimeout(type, 500);

  // Desplazamiento suave al hacer clic en enlaces del navbar
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // Evitar el comportamiento predeterminado
      const targetId = link.getAttribute('href').substring(1); // Obtener ID de la sección
      const targetSection = document.getElementById(targetId); // Seleccionar la sección
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' }); // Desplazamiento suave
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const typingText = document.querySelector('.typing-text');
  const textArray = ["Desarrollador Web", "Backend Developer", "Frontend Enthusiast"];

  // Calcular la altura más grande
  const maxHeight = Math.max(...textArray.map(text => {
    const tempSpan = document.createElement('span');
    tempSpan.textContent = text;
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.position = 'absolute';
    typingText.appendChild(tempSpan);
    const height = tempSpan.offsetHeight;
    typingText.removeChild(tempSpan);
    return height;
  }));

  // Aplicar la altura máxima como minHeight
  typingText.style.minHeight = `${maxHeight}px`;
});

document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.carousel');

  carousels.forEach(carousel => {
    const images = carousel.querySelectorAll('img');
    let currentIndex = 0;

    const showNextImage = () => {
      images[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].classList.add('active');
    };

    images[currentIndex].classList.add('active');
    setInterval(showNextImage, 3000); // Change image every 3 seconds
  });
});

