import{l as v,h as u}from"./utils-BdbU3szs.js";/* empty css              */const h=[{user:{username:"CoffeeLover22"},body:"The Ethiopian Yirgacheffe is a game-changer! The fruity notes are so bright and clear. My new morning go-to."},{user:{username:"DailyGrind"},body:"Solid espresso blend. Pulls a great shot with thick crema every time. Consistent and reliable for my daily latte."},{user:{username:"JavaJane"},body:"I tried the Weekend Brunch Blend and it's delightful. Smooth, balanced, with hints of chocolate and nuts. Perfect for a lazy Sunday."},{user:{username:"AlexChen"},body:"Great customer service and fast shipping. The beans arrived freshly roasted and smelled amazing right out of the box."},{user:{username:"MorningMug"},body:"The single-origin from Colombia has such a classic, rich coffee flavor. It's not too acidic, just a really satisfying, full-bodied cup."},{user:{username:"DecafDeb"},body:"Finally, a decaf that doesn't taste like disappointment! The Swiss Water Process decaf is full of flavor. I can enjoy a great cup in the evening without the buzz."}];function g(a){const e=(Math.random()*.7999999999999998+4.2).toFixed(1);return`
    <div class="review-card carousel-slide">
      <div class="review-header">
        <h4>${a.user.username}</h4>
        <div class="review-rating">
          <div class="stars" style="--rating: ${e};" aria-label="Rating of ${e} out of 5 stars"></div>
          <span class="verified">Verified Purchase</span>
        </div>
      </div>
      <p class="review-text">"${a.body}"</p>
    </div>
  `}function f(a){const e=document.querySelector(".review-summary-section");if(!a||a.length===0){e.innerHTML="<p>No review data available.</p>";return}const i=4.8,t=a.length;e.innerHTML=`
    <div class="rating-display">
      <p class="average-rating">${i}</p>
      <div class="stars" style="--rating: ${i};"></div>
      <p class="total-reviews">Based on ${t} reviews</p>
    </div>
    <div class="rating-breakdown">
      <div class="rating-bar-container"><span class="label">5 star</span><div class="rating-bar"><div class="rating-bar-fill" style="width: 90%;"></div></div></div>
      <div class="rating-bar-container"><span class="label">4 star</span><div class="rating-bar"><div class="rating-bar-fill" style="width: 5%;"></div></div></div>
      <div class="rating-bar-container"><span class="label">3 star</span><div class="rating-bar"><div class="rating-bar-fill" style="width: 3%;"></div></div></div>
      <div class="rating-bar-container"><span class="label">2 star</span><div class="rating-bar"><div class="rating-bar-fill" style="width: 1%;"></div></div></div>
      <div class="rating-bar-container"><span class="label">1 star</span><div class="rating-bar"><div class="rating-bar-fill" style="width: 1%;"></div></div></div>
    </div>
  `}function y(){const a=document.querySelector(".carousel-track");if(!a)return;const e=Array.from(a.children),i=document.querySelector(".carousel-btn.next"),t=document.querySelector(".carousel-btn.prev");if(!e||e.length===0||!i||!t)return;const o=e[0].getBoundingClientRect().width;let s=0;const d=(n,c)=>{n.style.left=o*c+"px"};e.forEach(d);const r=n=>{a.style.transform="translateX(-"+e[n].style.left+")",s=n,l()},l=()=>{t.style.display=s===0?"none":"block",i.style.display=s>=e.length-2?"none":"block"};t.addEventListener("click",()=>{s>0&&r(s-1)}),i.addEventListener("click",()=>{s<e.length-1&&r(s+1)}),l()}function b(){const a=document.querySelector("#reviews-list"),e=h;e&&Array.isArray(e)&&e.length>0?(f(e),a.innerHTML=e.map(i=>g(i)).join(""),y()):a.innerHTML="<p>No reviews found.</p>"}async function p(){await v(),u(),b()}p();
