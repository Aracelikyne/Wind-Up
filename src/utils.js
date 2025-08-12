// src/utils.js

import { getLocalStorage } from './lib/localStorage.js';

const CART_KEY = 'so-cart';

/**
 * Reads the cart from localStorage and updates the cart icon in the header
 * to show the total number of items.
 */
export function updateCartIcon() {
  const cart = getLocalStorage(CART_KEY) || [];
  const countElement = document.querySelector('.cart-count');
  
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (countElement) {
    if (totalQuantity > 0) {
      countElement.textContent = totalQuantity;
      countElement.classList.remove('hide');
    } else {
      countElement.classList.add('hide');
    }
  }
}

/**
 * Fetches the content of a template file at a given path.
 * @param {string} path The path to the template file.
 * @returns {Promise<string>} The template HTML as a string.
 */
async function loadTemplate(path) {
  const response = await fetch(path);
  if (response.ok) {
    return await response.text();
  }
}

/**
 * Sets up the event listener for the mobile hamburger menu.
 */
function setupMobileMenu() {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const navContainer = document.querySelector('.nav-container');

  if (hamburgerBtn && navContainer) {
    hamburgerBtn.addEventListener('click', () => {
      navContainer.classList.toggle('nav-open');
    });
  }
}

/**
 * Loads the header and footer templates into the page and initializes their components.
 */
export async function loadHeaderFooter() {
  const headerElement = document.querySelector('header');
  const footerElement = document.querySelector('footer');
  
  const headerTemplate = await loadTemplate('/partials/header.html');
  const footerTemplate = await loadTemplate('/partials/footer.html');

  if (headerElement) {
    headerElement.innerHTML = headerTemplate;
  }
  if (footerElement) {
    footerElement.innerHTML = footerTemplate;
  }

  setupMobileMenu();
  updateCartIcon(); // This function is now local to this file
}

/**
 * Finds the active page and adds a corresponding class to the nav link.
 */
export function highlightActiveLink() {
  const currentPage = window.location.pathname;
  const activePage = currentPage === '/' ? '/' : currentPage.replace('index.html', '');

  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach((link) => {
    if (link.getAttribute('href') === activePage) {
      link.classList.add('active');
    }
  });
}

/**
 * Gets a parameter's value from the current URL's query string.
 * @param {string} param The name of the URL parameter.
 * @returns {string | null}
 */
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

/**
 * Displays a toast notification message to the user.
 * @param {string} message The message to display.
 * @param {number} duration How long to display the message in milliseconds.
 */
export function showToast(message, duration = 3000) {
  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
  }, 100);

  setTimeout(() => {
    toast.classList.remove('show');
    toast.addEventListener('transitionend', () => {
      if (toast.parentNode) {
        document.body.removeChild(toast);
      }
    });
  }, duration);
}