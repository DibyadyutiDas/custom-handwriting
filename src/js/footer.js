export function initFooter() {
  // Set current year in copyright text
  const currentYearElement = document.getElementById('current-year');
  const currentYear = new Date().getFullYear();
  
  if (currentYearElement) {
    currentYearElement.textContent = currentYear.toString();
  }
}