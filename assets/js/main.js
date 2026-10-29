document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', String(!isExpanded));
      mobileMenuBtn.setAttribute('aria-label', isExpanded ? 'Open navigation menu' : 'Close navigation menu');
      mobileMenu.classList.toggle('hidden', isExpanded);
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.setAttribute('aria-label', 'Open navigation menu');
      });
    });
  }

  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const updateActiveLink = () => {
    let activeSection = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
      if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
        activeSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${activeSection}`;
      link.classList.toggle('text-indigo-400', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filterValue = button.getAttribute('data-filter');

      filterButtons.forEach((filterButton) => {
        const isActive = filterButton === button;
        filterButton.setAttribute('aria-pressed', String(isActive));
        filterButton.classList.toggle('bg-indigo-600', isActive);
        filterButton.classList.toggle('text-white', isActive);
        filterButton.classList.toggle('bg-slate-800', !isActive);
        filterButton.classList.toggle('text-slate-300', !isActive);
      });

      projectCards.forEach((card) => {
        const matches = filterValue === 'all' || card.getAttribute('data-category') === filterValue;
        card.classList.toggle('hidden', !matches);
      });
    });
  });

  const modal = document.getElementById('concert-modal');
  const openButton = document.querySelector('[data-open-modal="concert-modal"]');
  const closeButton = modal?.querySelector('[data-close-modal]');
  let previouslyFocusedElement = null;

  const closeModal = () => {
    if (!modal || modal.classList.contains('hidden')) {
      return;
    }

    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
    previouslyFocusedElement?.focus();
  };

  if (modal && openButton) {
    openButton.addEventListener('click', () => {
      previouslyFocusedElement = document.activeElement;
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.classList.add('overflow-hidden');
      closeButton?.focus();
    });

    closeButton?.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    });
  }
});
