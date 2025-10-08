document.addEventListener('DOMContentLoaded', () => {
  const menuLabel = document.getElementById('menu-label');
  const menuButtons = document.getElementById('menu-buttons');

  // Initially hide the buttons
  menuButtons.classList.add('hidden');
  menuLabel.setAttribute('aria-expanded', 'false');

  menuLabel.addEventListener('click', () => {
    const isExpanded = menuLabel.getAttribute('aria-expanded') === 'true';
    menuLabel.setAttribute('aria-expanded', !isExpanded);
    menuButtons.classList.toggle('hidden');
  });

  // Optional: Allow toggle with keyboard (Enter or Space)
  menuLabel.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      menuLabel.click();
    }
  });
});




  const sidebar = document.getElementById('sidebar');
  const hamburger = document.querySelector('.hamburger');
  const closeBtn = document.querySelector('.close-btn');

  // Open sidebar
  hamburger.addEventListener('click', () => {
    sidebar.classList.add('active');
  });

  // Close sidebar
  closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
  });

  // Optional: Close sidebar when clicking outside
  document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
      sidebar.classList.remove('active');
    }
  });

