function r(a){const c=`/product-detail/?id=${a.id}`;return`
      <div class="product-card">
        <a href="${c}" class="product-card-link-wrapper">
          <img src="${a.image}" alt="${a.name}" class="product-card-image">
          <div class="product-card-category">${a.category}</div>
          <h3 class="product-card-title">${a.name}</h3>
          <p class="product-card-description">${a.description}</p>
        </a>
        <div class="product-card-action">
          <p class="product-card-price">$${a.price.toFixed(2)}</p>
          <a href="${c}" class="btn-secondary">Order Now</a>
        </div>
      </div>
    `}export{r as P};
