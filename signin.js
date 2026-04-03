// signin.js - Sign in form page
// Handle sign in form validation

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.auth-form--signin');
  const emailInput = form.querySelector('input[type="email"]');
  const passwordInput = form.querySelector('input[type="password"]');
  const submitBtn = form.querySelector('.primary-submit');
  const forgotLink = form.querySelector('.text-link');
  const socialBtns = form.querySelectorAll('.social-button');
  const signupLink = form.querySelector('.auth-switch a');
  
  // Handle sign in
  if (submitBtn) {
    submitBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Basic validation
      if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
        alert('Please enter a valid email');
        return;
      }
      if (!passwordInput.value.trim()) {
        alert('Please enter your password');
        return;
      }
      
      // Form is valid
      console.log('Signing in:', {
        email: emailInput.value
      });
      alert('Signed in successfully!');
      // In a real app, you'd authenticate against a backend
    });
  }
  
  // Forgot password link
  if (forgotLink) {
    forgotLink.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = 'forgot.html';
    });
  }
  
  // Social button handlers
  socialBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const provider = this.textContent.trim();
      console.log('Signing in with:', provider);
      alert('Signing in with ' + provider);
    });
  });
  
  // Sign up link
  if (signupLink) {
    signupLink.addEventListener('click', function(e) {
      e.preventDefault();
      navigateTo('signup.html');
    });
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    // Escape to go back to getstarted
    if (e.key === 'Escape') {
      e.preventDefault();
      navigateTo('getstarted.html');
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
