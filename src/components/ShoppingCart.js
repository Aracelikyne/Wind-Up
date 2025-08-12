import {
  loadHeaderFooter,
  highlightActiveLink,
  getParam,
  showToast,
} from '../utils.js';
import { setLocalStorage, getLocalStorage } from '../lib/localStorage.js';
import { updateCartIcon } from '../components/ShoppingCart.js';
import { getUpcomingEvents } from '../api/calendar-api.js';
import { checkDeliveryRange } from '../api/maps-api.js';

let allProducts = [];
const CART_KEY = 'so-cart';

// --- THIS IS THE DEBUGGING VERSION ---
function addToCart(productId) {
  console.log('--- Debug: addToCart function started ---');
  
  const quantity = parseInt(document.querySelector('#quantity-input').value);
  console.log(`Debug: Quantity to add: ${quantity}`);
  
  let cart = getLocalStorage(CART_KEY) || [];
  console.log('Debug: Cart before adding item:', cart);

  const productToAdd = allProducts.find((item) => item.id === productId);
  
  if (!productToAdd) {
    console.error('Debug ERROR: Product not found in allProducts array!');
    return;
  }
  console.log('Debug: Found product to add:', productToAdd);

  const existingItemIndex = cart.findIndex((item) => item.id === productId);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity;
    console.log('Debug: Updated quantity for existing item.');
  } else {
    cart.push({
      id: productToAdd.id,
      name: productToAdd.name,
      image: productToAdd.image,
      price: productToAdd.price,
      quantity: quantity,
    });
    console.log('Debug: Added new item to cart.');
  }

  console.log('Debug: Cart after adding item:', cart);
  
  try {
    setLocalStorage(CART_KEY, cart);
    console.log('Debug: Successfully called setLocalStorage.');
    
    // Let's verify it was actually saved
    const savedCart = getLocalStorage(CART_KEY);
    console.log('Debug: Verified cart data from storage:', savedCart);

  } catch (error) {
    console.error('Debug ERROR: Failed to save to localStorage!', error);
  }

  updateCartIcon();
  showToast(
    `Added ${quantity} x ${productToAdd.name} to cart!`
  );
  console.log('--- Debug: addToCart function finished ---');
}


// --- All other functions remain the same ---

function renderProductDetails(product) {
  const container = document.querySelector('#product-detail-container');
  container.innerHTML = `
    <section class="product-detail">
      <div class="product-image-container">
        <img src="${product.image}" alt="${product.name}" class="product-detail-image">
      </div>
      <div class="product-info-container">
        <h2 class="product-title">${product.name}</h2>
        <p class="product-description">${product.description}</p>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        
        <div class="quantity-selector">
          <button type="button" class="quantity-btn minus" aria-label="Decrease quantity">-</button>
          <input type="number" id="quantity-input" class="quantity-input" value="1" min="1">
          <button type="button" class="quantity-btn plus" aria-label="Increase quantity">+</button>
        </div>

        <button class="btn-primary" id="addToCartBtn" data-id="${
          product.id
        }">Add to Cart</button>

        <div class="availability-delivery-wrapper">
          <div id="availability-section">
            <h4>Availability</h4>
            <p class="availability-subtitle">Booked days are disabled.</p>
            <div id="calendar-container"></div>
          </div>

          <div class="delivery-column">
            <div id="map-container">
              <h4>Delivery Area</h4>
              <div class="map-embed">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3470.400159986274!2d-98.34443998936655!3d29.562958175066008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865c8daf57efb4d9%3A0x416a815776d5b784!2sBlack%20Rifle%20Coffee%20Company!5e0!3m2!1sen!2sus!4v1754898299171!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>
            <div id="delivery-check-section">
              <h4>Check Delivery</h4>
              <form id="delivery-check-form">
                <input type="text" id="delivery-address" name="delivery-address" placeholder="Enter address or zip" required />
                <button type="submit" class="btn-secondary">Check</button>
              </form>
              <p id="delivery-message"></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderCalendar(bookedEvents) {
  const calendarContainer = document.querySelector('#calendar-container');
  if (!calendarContainer) return;

  const bookedDates = (bookedEvents || []).map((event) => {
    const date = new Date(event.start.dateTime || event.start.date);
    return date.toISOString().split('T')[0];
  });

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 90);

  const interval = setInterval(() => {
    if (window.flatpickr) {
      clearInterval(interval);
      flatpickr(calendarContainer, {
        minDate: today,
        maxDate: maxDate,
        disable: bookedDates,
        inline: true,
      });
    }
  }, 100);
}

function setupDeliveryCheck() {
  const form = document.querySelector('#delivery-check-form');
  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const address = document.querySelector('#delivery-address').value;
      const messageEl = document.querySelector('#delivery-message');

      if (!address) {
        showToast('Please enter an address or zip code.');
        return;
      }

      messageEl.textContent = 'Checking...';
      const isDeliverable = await checkDeliveryRange(address);

      if (isDeliverable) {
        messageEl.textContent = 'Great news! We can deliver to you.';
        messageEl.classList.add('success-message');
        messageEl.classList.remove('error-message');
      } else {
        messageEl.textContent = 'Sorry, you are outside our delivery range.';
        messageEl.classList.add('error-message');
        messageEl.classList.remove('success-message');
      }
    });
  }
}

function setupQuantitySelector() {
  const minusBtn = document.querySelector('.quantity-btn.minus');
  const plusBtn = document.querySelector('.quantity-btn.plus');
  const quantityInput = document.querySelector('#quantity-input');

  minusBtn.addEventListener('click', () => {
    let currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
    }
  });

  plusBtn.addEventListener('click', () => {
    let currentValue = parseInt(quantityInput.value);
    quantityInput.value = currentValue + 1;
  });
}

async function initializeProductDetailPage() {
  await loadHeaderFooter();
  highlightActiveLink();

  const productId = getParam('id');

  try {
    const response = await fetch('/json/products.json');
    if (!response.ok) throw new Error('Failed to fetch products');
    allProducts = await response.json();

    const product = allProducts.find((p) => p.id === productId);
    if (product) {
      document.title = `${product.name} | The Coffee Corner`;
      renderProductDetails(product);
      setupQuantitySelector();
      setupDeliveryCheck();
      document
        .querySelector('#addToCartBtn')
        .addEventListener('click', () => addToCart(productId));

      const events = await getUpcomingEvents();
      renderCalendar(events);
    } else {
      document.querySelector('#product-detail-container').innerHTML =
        '<h2>Product not found.</h2>';
    }
  } catch (error) {
    console.error('Error initializing page:', error);
  }
}

initializeProductDetailPage();