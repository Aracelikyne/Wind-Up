import { loadHeaderFooter, highlightActiveLink, updateCartIcon } from '../utils.js';
import { getLocalStorage, setLocalStorage } from '../lib/localStorage.js';

const CART_KEY = 'so-cart';

// Creates the HTML for a single cart item
function cartItemTemplate(item) {
  return `
    <li class="cart-card">
      <img src="${item.image}" alt="${item.name}" class="cart-card__image">
      <div class="cart-card__details">
        <h2 class="card__name">${item.name}</h2>
        <p class="cart-card__price">$${item.price.toFixed(2)}</p>
        <p class="cart-card__quantity">qty: ${item.quantity}</p>
      </div>
      <button class="cart-card__remove" data-id="${item.id}" aria-label="Remove ${item.name}">&times;</button>
    </li>
  `;
}

// Renders all items in the cart to the page
function renderCartContents() {
  const cartItems = getLocalStorage(CART_KEY) || [];
  const productList = document.querySelector('.product-list');
  const cartFooter = document.querySelector('.cart-footer');
  const cartTotalEl = document.querySelector('.cart-total');

  if (cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    productList.innerHTML = `<ul>${htmlItems.join('')}</ul>`;

    // Calculate and display the total
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    cartTotalEl.textContent = `Total: $${total.toFixed(2)}`;

    // Show the total and checkout button
    cartFooter.classList.remove('hide');
    // Add event listeners to remove buttons
    addRemoveListeners();
  } else {
    productList.innerHTML = '<p>Your cart is empty.</p>';
    cartFooter.classList.add('hide');
  }
}

// Sets up event listeners for all remove buttons
function addRemoveListeners() {
  const removeButtons = document.querySelectorAll('.cart-card__remove');
  removeButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const productId = e.target.dataset.id;
      removeItemFromCart(productId);
    });
  });
}

// Removes a specific item from the cart
function removeItemFromCart(productId) {
  let cart = getLocalStorage(CART_KEY) || [];
  const updatedCart = cart.filter((item) => item.id !== productId);
  setLocalStorage(CART_KEY, updatedCart);

  // Re-render the cart and update the header icon
  renderCartContents();
  updateCartIcon();
}

// Main initialization function
async function initializeCartPage() {
  await loadHeaderFooter();
  highlightActiveLink();
  renderCartContents();
}

initializeCartPage();