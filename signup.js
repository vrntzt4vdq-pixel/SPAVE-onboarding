// signup.js - Sign up form page
// Handle form validation and submission

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.auth-form');
  const nameInput = form.querySelector('input[type="text"]');
  const emailInput = form.querySelector('input[type="email"]');
  const passwordInput = form.querySelector('input[type="password"]');
  const submitBtn = form.querySelector('.primary-submit');
  const socialBtns = form.querySelectorAll('.social-button');
  const backLink = document.querySelector('.getstarted-link-wrap a');
  const signinLink = form.querySelector('.auth-switch a');
  
  // Validate and submit form
  if (submitBtn) {
    submitBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Basic validation
      if (!nameInput.value.trim()) {
        alert('Please enter your name');
        return;
      }
      if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
        alert('Please enter a valid email');
        return;
      }
      if (!passwordInput.value.trim() || passwordInput.value.length < 6) {
        alert('Password must be at least 6 characters');
        return;
      }
      
      // Form is valid
      console.log('Account created:', {
        name: nameInput.value,
        email: emailInput.value
      });
      alert('Account created successfully!');
      // In a real app, you'd send this data to a server
    });
  }
  
  // Social button handlers
  socialBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const provider = this.textContent.trim();
      console.log('Signing up with:', provider);
      alert('Signing up with ' + provider);
    });
  });
  
  // Back link
  if (backLink) {
    backLink.addEventListener('click', function(e) {
      e.preventDefault();
      navigateTo('getstarted.html');
    });
  }
  
  // Sign in link
  if (signinLink) {
    signinLink.addEventListener('click', function(e) {
      e.preventDefault();
      navigateTo('signin.html');
    });
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    // Escape to go back
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
