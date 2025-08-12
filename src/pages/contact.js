import { loadHeaderFooter, highlightActiveLink, showToast } from '../utils.js';

/**
 * submission of the contact form.
 * @param {Event} event form submission event.
 */
function handleContactFormSubmission(event) {
  event.preventDefault();

  const form = document.getElementById('contact-form');
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  console.log('Form data submitted:', data);
  showToast('Thank you! Your message has been sent successfully.', 5000);
  
  // send this data to a backend server.
  // just log it and reset the form.
  
  form.reset();
}

/**
 * Initializes the contact page.
 */
async function initializeContactPage() {
  await loadHeaderFooter();
  highlightActiveLink();
  
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', handleContactFormSubmission);
  }
}

initializeContactPage();