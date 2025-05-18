export function initHeader() {
  const header = document.querySelector('.header');
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  
  // Handle scroll events to add shadow to header
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    } else {
      header.style.boxShadow = 'none';
    }
  });
  
  // Toggle mobile menu
  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    
    // Update aria-expanded attribute
    const isExpanded = mobileMenu.classList.contains('active');
    mobileMenuButton.setAttribute('aria-expanded', isExpanded);
    
    // Toggle menu icon
    if (isExpanded) {
      mobileMenuButton.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      `;
    } else {
      mobileMenuButton.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      `;
    }
  });
  
  // Close mobile menu when clicking on a link
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      
      mobileMenuButton.setAttribute('aria-expanded', 'false');
      mobileMenuButton.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      `;
    });
  });
}