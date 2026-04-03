// intro4.js - Intro slide (04 of 05)
// Handle navigation buttons and keyboard interactions

document.addEventListener('DOMContentLoaded', function() {
  const nextBtn = document.querySelector('.cta-button');
  const skipBtn = document.querySelector('.skip-link');
  
  // Button navigation
  if (nextBtn) {
    nextBtn.addEventListener('click', function(e) {
      e.preventDefault();
      navigateTo('intro5.html');
    });
  }
  
  if (skipBtn) {
    skipBtn.addEventListener('click', function(e) {
      e.preventDefault();
      navigateTo('signup.html');
    });
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    // Right arrow or Space for next
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      navigateTo('intro5.html');
    }
    // Left arrow for previous
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      navigateTo('intro3.html');
    }
    // Escape to skip
    if (e.key === 'Escape') {
      e.preventDefault();
      navigateTo('signup.html');
    }
  });
  
  // Touch/swipe navigation for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchStartX - touchEndX;
    
    // Swipe left (next)
    if (Math.abs(swipeDistance) > swipeThreshold && swipeDistance < 0) {
      navigateTo('intro5.html');
    }
    // Swipe right (previous)
    if (Math.abs(swipeDistance) > swipeThreshold && swipeDistance > 0) {
      navigateTo('intro3.html');
    }
  }
  
  function navigateTo(url) {
    // Add a subtle transition effect
    document.body.style.opacity = '0.7';
    setTimeout(function() {
      window.location.href = url;
    }, 150);
  }
});
