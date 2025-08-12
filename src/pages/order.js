import { loadHeaderFooter, highlightActiveLink } from '../utils.js';
import { ProductCard } from '../components/ProductCard.js';

async function initializeOrderPage() {
  // Load common elements and set the active navigation link
  await loadHeaderFooter();
  highlightActiveLink();

  try {
    // Fetch the full list of products
    const response = await fetch('/json/products.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const allProducts = await response.json();

    const container = document.querySelector('#order-products-grid');

    const productsHTML = allProducts
      .map((product) => ProductCard(product))
      .join('');

    container.innerHTML = productsHTML;
  } catch (error) {
    console.error('Failed to initialize order page:', error);
  }
}

// Run the function to build the page
initializeOrderPage();
