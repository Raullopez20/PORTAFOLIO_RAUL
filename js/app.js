document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle functionality
  const themeToggle = document.querySelector('.theme-toggle');
  const html = document.documentElement;
  let darkMode = localStorage.getItem("darkMode") === "true";
  html.classList.toggle("dark-mode", darkMode);

  const updateThemeIcon = () => {
    themeToggle.textContent = darkMode ? "☀️" : "🌙";
  };

  themeToggle.addEventListener("click", () => {
    darkMode = !darkMode;
    localStorage.setItem("darkMode", darkMode);
    html.classList.toggle("dark-mode", darkMode);
    updateThemeIcon();
  });

  updateThemeIcon();

  // Typing effect functionality
  const typingText = document.querySelector('.typing-text');
  const textArray = ["Desarrollador Web", "Backend Developer", "Frontend Enthusiast"];
  let textIndex = 0;
  let charIndex = 0;
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

  // Carousel functionality
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
    setInterval(showNextImage, 3000);
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

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  prevBtn.addEventListener('click', () => {
    currentImgIndex = (currentImgIndex - 1 + images.length) % images.length;
    updateModalImage();
  });

  nextBtn.addEventListener('click', () => {
    currentImgIndex = (currentImgIndex + 1) % images.length;
    updateModalImage();
  });

  function showModal() {
    modal.style.display = 'block';
    updateModalImage();
  }

  function updateModalImage() {
    modalImg.src = images[currentImgIndex].src;
  }
});
