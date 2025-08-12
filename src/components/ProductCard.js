/**
 * Creates the HTML for a single product card.
 * @param {object} product The product object to render.
 * @returns {string} The HTML string for the product card.
 */
export function ProductCard(product) {
    const productLink = `/product-detail/?id=${product.id}`;
  
    return `
      <div class="product-card">
        <a href="${productLink}" class="product-card-link-wrapper">
          <img src="${product.image}" alt="${product.name}" class="product-card-image">
          <div class="product-card-category">${product.category}</div>
          <h3 class="product-card-title">${product.name}</h3>
          <p class="product-card-description">${product.description}</p>
        </a>
        <div class="product-card-action">
          <p class="product-card-price">$${product.price.toFixed(2)}</p>
          <a href="${productLink}" class="btn-secondary">Order Now</a>
        </div>
      </div>
    `;
  }