import{l as u,h as m,b as p,a as c,g as y,s as v,u as f}from"./utils-BdbU3szs.js";/* empty css              */import{g as b,c as h}from"./maps-api-W5OxXTI8.js";let s=[];const o="so-cart";function g(t){const i=document.querySelector("#product-detail-container");i.innerHTML=`
    <section class="product-detail">
      <div class="product-image-container">
        <img src="${t.image}" alt="${t.name}" class="product-detail-image">
      </div>
      <div class="product-info-container">
        <h2 class="product-title">${t.name}</h2>
        <p class="product-description">${t.description}</p>
        <p class="product-price">$${t.price.toFixed(2)}</p>
        
        <div class="quantity-selector">
          <button type="button" class="quantity-btn minus" aria-label="Decrease quantity">-</button>
          <input type="number" id="quantity-input" class="quantity-input" value="1" min="1">
          <button type="button" class="quantity-btn plus" aria-label="Increase quantity">+</button>
        </div>

        <button class="btn-primary" id="addToCartBtn" data-id="${t.id}">Add to Cart</button>

        <div class="availability-delivery-wrapper">
          <div id="availability-section">
            <h4>Select a Time for Today</h4>
            <p class="availability-subtitle">Booked time slots are disabled.</p>
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
  `}function q(t=[]){const i=document.querySelector("#calendar-container");if(!i)return;const a=n=>{for(const r of t){const d=new Date(r.start.dateTime),l=new Date(r.end.dateTime);if(n>=d&&n<l)return!0}return!1},e=setInterval(()=>{window.flatpickr&&(clearInterval(e),flatpickr(i,{inline:!0,enableTime:!0,noCalendar:!0,dateFormat:"h:i K",minDate:"today",maxDate:"today",minTime:"09:00",maxTime:"17:00",minuteIncrement:60,disable:[a]}))},100)}function w(){const t=document.querySelector("#delivery-check-form");t&&t.addEventListener("submit",async i=>{i.preventDefault();const a=document.querySelector("#delivery-address").value,e=document.querySelector("#delivery-message");if(!a){c("Please enter an address or zip code.");return}e.textContent="Checking...",await h(a)?(e.textContent="Great news! We can deliver to you.",e.classList.add("success-message"),e.classList.remove("error-message")):(e.textContent="Sorry, you are outside our delivery range.",e.classList.add("error-message"),e.classList.remove("success-message"))})}function C(t){let i=y(o)||[];const a=parseInt(document.querySelector("#quantity-input").value),e=i.findIndex(n=>n.id===t);if(e>-1)i[e].quantity+=a;else{const n=s.find(r=>r.id===t);n&&i.push({id:n.id,name:n.name,image:n.image,price:n.price,quantity:a})}v(o,i),f(),c(`Added ${a} x ${s.find(n=>n.id===t).name} to cart!`)}function T(){const t=document.querySelector(".quantity-btn.minus"),i=document.querySelector(".quantity-btn.plus"),a=document.querySelector("#quantity-input");t.addEventListener("click",()=>{let e=parseInt(a.value);e>1&&(a.value=e-1)}),i.addEventListener("click",()=>{let e=parseInt(a.value);a.value=e+1})}async function k(){await u(),m();const t=p("id");try{const i=await fetch("/json/products.json");if(!i.ok)throw new Error("Failed to fetch products");s=await i.json();const a=s.find(e=>e.id===t);if(a){document.title=`${a.name} | The Coffee Corner`,g(a),T(),w(),document.querySelector("#addToCartBtn").addEventListener("click",()=>C(t));const e=await b();q(e)}else document.querySelector("#product-detail-container").innerHTML="<h2>Product not found.</h2>"}catch(i){console.error("Error initializing page:",i)}}k();
