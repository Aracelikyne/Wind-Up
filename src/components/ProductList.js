import { ProductCard } from './ProductCard.js';

/**
 * Renders a list of product cards into a specified container.
 * @param {Array} productList - The array of product objects to render.
 * @param {HTMLElement} containerElement - The DOM element to insert the list into.
 */
export function renderProductList(productList, containerElement) {
  if (containerElement) {
    const productsHTML = productList
      .map((product) => ProductCard(product))
      .join('');
    containerElement.innerHTML = productsHTML;
  } else {
    console.error('Render container for product list not found.');
  }
}
