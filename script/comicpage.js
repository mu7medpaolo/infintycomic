document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.querySelector('.nav-links');
  
  menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      this.innerHTML = navLinks.classList.contains('active') ? 
          '<i class="fas fa-times"></i>' : 
          '<i class="fas fa-bars"></i>';
  });
  
  // Dark Mode Toggle
  const themeToggle = document.getElementById('themeToggle');
  
  // Check for saved theme preference
  if (localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark-mode');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
  
  themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      const isDarkMode = document.body.classList.contains('dark-mode');
      
      localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
      this.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });
  
  // Search functionality
  const searchBtn = document.getElementById('searchBtn');
  if (searchBtn) {
      searchBtn.addEventListener('click', function() {
          const searchTerm = document.getElementById('searchInput').value.trim();
          if (searchTerm) {
              alert(`Search functionality would show results for: ${searchTerm}`);
              // In a real implementation, you would filter and display results
          }
      });
  }
});

  window.addEventListener("load", function () {
    setTimeout(function () {
      const loader = document.querySelector(".loading-screen-center");
      if (loader) {
        loader.style.opacity = "0";
        loader.style.transition = "opacity 0.5s ease";
        setTimeout(() => loader.style.display = "none", 500); // بعد ما يخلص الانيميشن
      }
    }, 3000); // 3000 ملي ثانية = 3 ثواني
  });

