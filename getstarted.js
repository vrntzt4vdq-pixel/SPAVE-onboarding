// getstarted.js - Get Started landing page
// Handle button interactions and keyboard navigation

document.addEventListener('DOMContentLoaded', function() {
  const getStartedBtn = document.querySelector('.launch-button.start-button');
  const accountLink = document.querySelector('.account-link');
  
  // Button navigation
  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', function(e) {
      e.preventDefault();
      navigateTo('signup.html');
    });
  }
  
  if (accountLink) {
    accountLink.addEventListener('click', function(e) {
      e.preventDefault();
      navigateTo('signin.html');
    });
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    // Enter or Space for Get Started
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigateTo('signup.html');
    }
    // Left arrow for back to intro5
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      navigateTo('intro5.html');
    }
    // Escape for sign in
    if (e.key === 'Escape') {
      e.preventDefault();
      navigateTo('signin.html');
    }
  });
  
  function navigateTo(url) {
    // Add a subtle transition effect
    document.body.style.opacity = '0.7';
    setTimeout(function() {
      window.location.href = url;
    }, 150);
  }
});
