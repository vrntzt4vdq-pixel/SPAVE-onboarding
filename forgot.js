// forgot.js - Forgot password page
// Handle password reset flow

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.auth-form--signin');
  const emailInput = form.querySelector('input[type="email"]');
  const submitBtn = form.querySelector('.primary-submit');
  const backLink = form.querySelector('.auth-switch a');
  
  // Handle password reset request
  if (submitBtn) {
    submitBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Validate email
      if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
        alert('Please enter a valid email address');
        return;
      }
      
      // Simulate reset email sent
      console.log('Password reset email sent to:', emailInput.value);
      alert('Password reset link sent to ' + emailInput.value);
      
      // In a real app, you'd send an actual reset email
    });
  }
  
  // Back to sign in
  if (backLink) {
    backLink.addEventListener('click', function(e) {
      e.preventDefault();
      navigateTo('signin.html');
    });
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    // Escape to go back to signin
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
