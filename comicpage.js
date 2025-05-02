document.addEventListener('DOMContentLoaded', function() {
  // Loading screen
  setTimeout(function() {
    const loader = document.querySelector('.loading-screen-center');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => loader.style.display = 'none', 500);
    }
  }, 3000);

  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      this.classList.toggle('active');
      this.innerHTML = navLinks.classList.contains('active') ? 
          '<i class="fas fa-times"></i>' : 
          '<i class="fas fa-bars"></i>';
    });
  }

  // Dark mode toggle
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  
  // Check for saved theme preference
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> <span class="mode-text">Light Mode</span>';
  }
  
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      const isDarkMode = document.body.classList.contains('dark-mode');
      
      localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
      this.innerHTML = isDarkMode ? 
        '<i class="fas fa-sun"></i> <span class="mode-text">Light Mode</span>' : 
        '<i class="fas fa-moon"></i> <span class="mode-text">Dark Mode</span>';
    });
  }

  // FAQ accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      item.classList.toggle('active');
    });
  });

  // Back to top button
  const backToTopButton = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });
  
  if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Animate stats counters
  const statNumbers = document.querySelectorAll('.stat-number');
  const animationDuration = 2000; // 2 seconds
  const frameDuration = 1000 / 60; // 60 frames per second
  const totalFrames = Math.round(animationDuration / frameDuration);
  
  const easeOutQuad = t => t * (2 - t);
  
  const animateCounters = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-count'));
      let frame = 0;
      
      const counter = setInterval(() => {
        frame++;
        const progress = easeOutQuad(frame / totalFrames);
        const currentValue = Math.round(target * progress);
        
        stat.textContent = currentValue;
        
        if (frame === totalFrames) {
          clearInterval(counter);
        }
      }, frameDuration);
    });
  };
  
  // Intersection Observer to trigger animation when stats are in view
  const statsSection = document.querySelector('.about-section');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
  }

  // Newsletter form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const successMessage = document.getElementById('newsletterSuccess');
      
      // Simulate form submission
      setTimeout(() => {
        newsletterForm.style.display = 'none';
        successMessage.style.display = 'flex';
      }, 1000);
    });
  }

  // Search functionality
  const searchButton = document.getElementById('searchButton');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  
  if (searchButton && searchInput && searchResults) {
    searchButton.addEventListener('click', function() {
      const searchTerm = searchInput.value.trim();
      if (searchTerm) {
        // In a real implementation, you would fetch and display results
        searchResults.innerHTML = `
          <div class="search-result-item">
            <a href="#">
              <img src="/imags-comics/placeholder-comic.jpg" alt="Comic thumbnail">
              <div>
                <p>Sample Comic Result</p>
                <small>Showing results for: ${searchTerm}</small>
              </div>
            </a>
          </div>
          <div class="no-results">
            <p>Full search functionality coming soon!</p>
          </div>
        `;
        searchResults.style.display = 'block';
      }
    });
    
    // Hide results when clicking outside
    document.addEventListener('click', function(e) {
      if (!searchResults.contains(e.target) && e.target !== searchButton && e.target !== searchInput) {
        searchResults.style.display = 'none';
      }
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
});