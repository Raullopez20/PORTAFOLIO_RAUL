document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const feedback = document.getElementById("formFeedback");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      message: document.getElementById("message").value.trim(),
    };

    feedback.textContent = "Enviando mensaje...";

    try {
      const response = await fetch("/.netlify/functions/v1/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        feedback.textContent = "Mensaje enviado correctamente.";
        form.reset(); // Limpia el formulario después del envío
      } else {
        const errorData = await response.json();
        feedback.textContent = `Error: ${errorData.error || "No se pudo enviar el mensaje"}`;
      }
    } catch (error) {
      feedback.textContent = "Error al enviar el mensaje. Intenta de nuevo.";
    }
  });
});


document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle functionality
  const themeToggle = document.querySelector('.theme-toggle');
  const html = document.documentElement;
  let darkMode = localStorage.getItem("darkMode") === "true";
  html.classList.toggle("dark-mode", darkMode);

  const updateThemeIcon = () => {
    if (themeToggle) {
      themeToggle.textContent = darkMode ? "☀️" : "🌙";
    }
  };

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      darkMode = !darkMode;
      localStorage.setItem("darkMode", darkMode);
      html.classList.toggle("dark-mode", darkMode);
      updateThemeIcon();
    });
  }

  updateThemeIcon();

  // Typing effect functionality
  const typingText = document.querySelector('.typing-text');
  const textArray = ["Desarrollador Web", "Backend Developer", "Frontend Enthusiast"];
  let textIndex = 0;
  let charIndex = 0;
  if (typingText) {
    typingText.textContent = "";

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

    setTimeout(type, 500);

    // Calculate and set minHeight for typing text
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

    typingText.style.minHeight = `${maxHeight}px`;
  }

  // Smooth scroll functionality for navbar links
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Modal functionality
  const modal = document.getElementById('projectModal');
  const modalImg = document.querySelector('.modal-image');
  const closeBtn = document.querySelector('.close');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  let currentImgIndex = 0;
  let images = [];

  document.querySelectorAll('.project img').forEach(img => {
    img.addEventListener('click', (e) => {
      images = Array.from(e.target.parentElement.querySelectorAll('img'));
      currentImgIndex = images.indexOf(e.target);
      showModal();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentImgIndex = (currentImgIndex - 1 + images.length) % images.length;
      updateModalImage();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentImgIndex = (currentImgIndex + 1) % images.length;
      updateModalImage();
    });
  }

  function showModal() {
    if (modal) {
      modal.style.display = 'block';
      updateModalImage();
    }
  }

  function updateModalImage() {
    if (modalImg && images[currentImgIndex]) {
      modalImg.src = images[currentImgIndex].src;
    }
  }
});

// Menú Hamburguesa
const hamburgerMenu = document.getElementById('hamburgerMenu');
const navLinks = document.querySelector('.nav-links');

hamburgerMenu.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

