/* This page now uses a local array of fake reviews for demonstration purposes. */
import { loadHeaderFooter, highlightActiveLink } from '../utils.js';

// A local array of fake coffee reviews
const COFFEE_REVIEWS = [
  {
    user: { username: 'CoffeeLover22' },
    body: "The Ethiopian Yirgacheffe is a game-changer! The fruity notes are so bright and clear. My new morning go-to.",
  },
  {
    user: { username: 'DailyGrind' },
    body: 'Solid espresso blend. Pulls a great shot with thick crema every time. Consistent and reliable for my daily latte.',
  },
  {
    user: { username: 'JavaJane' },
    body: "I tried the Weekend Brunch Blend and it's delightful. Smooth, balanced, with hints of chocolate and nuts. Perfect for a lazy Sunday.",
  },
  {
    user: { username: 'AlexChen' },
    body: 'Great customer service and fast shipping. The beans arrived freshly roasted and smelled amazing right out of the box.',
  },
  {
    user: { username: 'MorningMug' },
    body: "The single-origin from Colombia has such a classic, rich coffee flavor. It's not too acidic, just a really satisfying, full-bodied cup.",
  },
  {
    user: { username: 'DecafDeb' },
    body: "Finally, a decaf that doesn't taste like disappointment! The Swiss Water Process decaf is full of flavor. I can enjoy a great cup in the evening without the buzz.",
  },
];

/**
 * Creates the HTML for a single review card.
 * @param {object} review The review object from the local array.
 * @returns {string} The HTML string for the review card.
 */
function reviewCardTemplate(review) {
  // Since the fake data doesn't provide a rating, we'll generate a random one for display
  const rating = (Math.random() * (5 - 4.2) + 4.2).toFixed(1);
  return `
    <div class="review-card carousel-slide">
      <div class="review-header">
        <h4>${review.user.username}</h4>
        <div class="review-rating">
          <div class="stars" style="--rating: ${rating};" aria-label="Rating of ${rating} out of 5 stars"></div>
          <span class="verified">Verified Purchase</span>
        </div>
      </div>
      <p class="review-text">"${review.body}"</p>
    </div>
  `;
}

/**
 * Renders a summary block based on the reviews data.
 * @param {Array} reviews The array of review objects.
 */
function renderReviewSummary(reviews) {
  const summaryContainer = document.querySelector('.review-summary-section');
  if (!reviews || reviews.length === 0) {
    summaryContainer.innerHTML = '<p>No review data available.</p>';
    return;
  }
  
  // For demonstration, we'll use a fixed average rating.
  const averageRating = 4.8;
  const totalReviews = reviews.length;

  summaryContainer.innerHTML = `
    <div class="rating-display">
      <p class="average-rating">${averageRating}</p>
      <div class="stars" style="--rating: ${averageRating};"></div>
      <p class="total-reviews">Based on ${totalReviews} reviews</p>
    </div>
    <div class="rating-breakdown">
      <div class="rating-bar-container"><span class="label">5 star</span><div class="rating-bar"><div class="rating-bar-fill" style="width: 90%;"></div></div></div>
      <div class="rating-bar-container"><span class="label">4 star</span><div class="rating-bar"><div class="rating-bar-fill" style="width: 5%;"></div></div></div>
      <div class="rating-bar-container"><span class="label">3 star</span><div class="rating-bar"><div class="rating-bar-fill" style="width: 3%;"></div></div></div>
      <div class="rating-bar-container"><span class="label">2 star</span><div class="rating-bar"><div class="rating-bar-fill" style="width: 1%;"></div></div></div>
      <div class="rating-bar-container"><span class="label">1 star</span><div class="rating-bar"><div class="rating-bar-fill" style="width: 1%;"></div></div></div>
    </div>
  `;
}

/**
 * Sets up the functionality for the review carousel.
 */
function setupCarousel() {
  const track = document.querySelector('.carousel-track');
  if (!track) return;
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.carousel-btn.next');
  const prevButton = document.querySelector('.carousel-btn.prev');
  
  if (!slides || slides.length === 0 || !nextButton || !prevButton) return;

  const slideWidth = slides[0].getBoundingClientRect().width;
  let currentIndex = 0;

  const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
  };
  slides.forEach(setSlidePosition);

  const moveToSlide = (targetIndex) => {
    track.style.transform = 'translateX(-' + slides[targetIndex].style.left + ')';
    currentIndex = targetIndex;
    updateNavButtons();
  };
  
  const updateNavButtons = () => {
    prevButton.style.display = currentIndex === 0 ? 'none' : 'block';
    nextButton.style.display = currentIndex >= slides.length - 2 ? 'none' : 'block';
  };

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) moveToSlide(currentIndex - 1);
  });

  nextButton.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) moveToSlide(currentIndex + 1);
  });
  
  updateNavButtons();
}

/**
 * Renders reviews from the local array and initializes the carousel.
 */
function renderReviews() {
  const reviewsContainer = document.querySelector('#reviews-list');
  const reviews = COFFEE_REVIEWS;

  if (reviews && Array.isArray(reviews) && reviews.length > 0) {
    renderReviewSummary(reviews); // Render the summary
    reviewsContainer.innerHTML = reviews.map(review => reviewCardTemplate(review)).join('');
    setupCarousel(); // Set up the carousel after reviews are loaded
  } else {
    reviewsContainer.innerHTML = '<p>No reviews found.</p>';
  }
}

/**
 * Initializes the reviews page.
 */
async function initializeReviewsPage() {
  await loadHeaderFooter();
  highlightActiveLink();
  renderReviews(); // This is no longer async
}

initializeReviewsPage();