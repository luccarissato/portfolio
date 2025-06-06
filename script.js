// === Lazy loading ===

const lazyImages = document.querySelectorAll('img[loading="lazy"]');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute('data-src');
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => {
    observer.observe(img);
  });
} else {
  lazyImages.forEach(img => {
    img.src = img.getAttribute('data-src');
    img.removeAttribute('data-src');
  });
}

const toggleButton = document.getElementById('theme-toggle');

function applyTheme(theme) {
  const isDark = theme === 'dark';

  document.body.classList.toggle('dark', isDark);

  // Estilo dos cartões "sobre-card"
  document.querySelectorAll('.sobre-card').forEach(card => {
    card.style.backgroundColor = isDark ? '#1e1e1e' : '#fff';
    card.style.color = isDark ? '#f0f0f0' : '#000';

    card.querySelectorAll('p, h3, h4, li').forEach(el => {
      el.style.color = isDark ? '#f0f0f0' : '#000';
    });
  });

  // Estilo para seção de projetos
  document.querySelectorAll('.projeto').forEach(proj => {
    proj.style.backgroundColor = isDark ? '#1e1e1e' : '#fff';
    proj.style.color = isDark ? '#f0f0f0' : '#000';

    proj.querySelectorAll('h3, p, strong').forEach(el => {
      el.style.color = isDark ? '#f0f0f0' : '#000';
    });
  });

  toggleButton.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
applyTheme(savedTheme);

toggleButton.addEventListener('click', () => {
  const newTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
  applyTheme(newTheme);
});

