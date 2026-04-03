// index.js - Loading/Splash page
// Auto-redirect to getstarted page after 3 seconds

document.addEventListener('DOMContentLoaded', function() {
  const splash = document.getElementById('splash');
  
  // Add loading animation or fade effect if desired
  splash.style.transition = 'opacity 0.5s ease-out';
  
  // Auto-redirect after 3 seconds
  const redirectTimer = setTimeout(function() {
    navigateTo('intro1.html');
  }, 3000);
  
  // Allow skip if user clicks the splash
  splash.addEventListener('click', function() {
    clearTimeout(redirectTimer);
    navigateTo('intro1.html');
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    // Any key press to skip
    clearTimeout(redirectTimer);
    navigateTo('intro1.html');
  });
  
  function navigateTo(url) {
    // Add a subtle transition effect
    document.body.style.opacity = '0.7';
    setTimeout(function() {
      window.location.href = url;
    }, 150);
  }
});
