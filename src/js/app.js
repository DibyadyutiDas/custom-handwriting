import { initHeader } from './header.js';
import { initHandwriting } from './handwriting.js';
import { initFooter } from './footer.js';

// Initialize all modules
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initHandwriting();
  initFooter();
});