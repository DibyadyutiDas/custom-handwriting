export function initApiSection() {
  const toggleButtons = document.querySelectorAll('.toggle-button');
  const copyButtons = document.querySelectorAll('.copy-button');
  
  // Initialize toggle functionality for API sections
  toggleButtons.forEach(button => {
    const section = button.getAttribute('data-section');
    const content = document.getElementById(`${section}-content`);
    
    button.addEventListener('click', () => {
      // Toggle visibility
      content.classList.toggle('hidden');
      
      // Toggle rotation of arrow icon
      button.classList.toggle('active');
      
      // Change SVG to up/down arrow
      if (content.classList.contains('hidden')) {
        button.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        `;
      } else {
        button.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        `;
      }
    });
  });
  
  // Initialize code copy functionality
  copyButtons.forEach(button => {
    const targetId = button.getAttribute('data-target');
    const codeElement = document.getElementById(targetId);
    
    button.addEventListener('click', () => {
      // Copy code to clipboard
      navigator.clipboard.writeText(codeElement.textContent).then(() => {
        // Show success state
        button.classList.add('copied');
        button.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        `;
        
        // Reset after 2 seconds
        setTimeout(() => {
          button.classList.remove('copied');
          button.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          `;
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy code:', err);
      });
    });
  });
}