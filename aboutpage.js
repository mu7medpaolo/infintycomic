// aboutpage.js - Enhanced with better search and animations

// Initialize Firebase (replace with your config)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// DOM Elements
const DOM = {
  searchInput: document.getElementById('searchInput'),
  searchResults: document.getElementById('searchResults'),
  searchButton: document.getElementById('searchButton'),
  darkModeToggle: document.getElementById('dark-mode-toggle'),
  mobileMenuToggle: document.querySelector('.mobile-menu-toggle'),
  navLinks: document.querySelector('.nav-links'),
  newsletterForm: document.getElementById('newsletterForm'),
  newsletterSuccess: document.getElementById('newsletterSuccess'),
  backToTop: document.getElementById('back-to-top'),
  faqQuestions: document.querySelectorAll('.faq-question'),
  statNumbers: document.querySelectorAll('.stat-number')
};

// Comics Data (would normally come from Firebase)
const COMICS_DATA = [
  { title: 'Laura Kinney: Wolverine', image: 'imags comics/Laura Kinney Wolverine.jpg', link: 'dare.html' },
  { title: 'Ant-Man (2015)', image: 'imags comics/antman1.jpg', link: 'antman.html' },
  { title: 'Deadpool/Wolverine (2025)', image: 'imags comics/Deadpool Wolverine.jpg', link: 'red.html' },
  { title: 'Doctor Strange of Asgard (2025) #1', image: 'imags comics/doctor.jpg', link: '#' },
  { title: 'WEB OF SPIDER-VERSE: NEW BLOOD (2025) #1', image: 'imags comics/webbllod.jpg', link: '#' }
];

// Initialize all functionality
function init() {
  setupMobileMenu();
  setupDarkMode();
  setupBackToTop();
  setupFAQ();
  setupNewsletter();
  setupSearch();
  setupStatsAnimation();
  setupLoadingScreen();
}

// Mobile Menu
function setupMobileMenu() {
  if (!DOM.mobileMenuToggle || !DOM.navLinks) return;

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);

  DOM.mobileMenuToggle.addEventListener('click', () => {
      DOM.navLinks.classList.toggle('active');
      overlay.classList.toggle('active');
      DOM.mobileMenuToggle.innerHTML = DOM.navLinks.classList.contains('active') 
          ? '<i class="fas fa-times"></i>' 
          : '<i class="fas fa-bars"></i>';
  });

  // Close menu when clicking overlay or links
  overlay.addEventListener('click', closeMobileMenu);
  document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
  });

  function closeMobileMenu() {
      DOM.navLinks.classList.remove('active');
      overlay.classList.remove('active');
      DOM.mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  }
}

// Dark Mode
function setupDarkMode() {
  if (!DOM.darkModeToggle) return;

  // Check for saved preference
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  if (isDarkMode) {
      document.body.classList.add('dark-mode');
      updateDarkModeButton(true);
  }

  // Toggle dark mode
  DOM.darkModeToggle.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', isDark);
      updateDarkModeButton(isDark);
  });

  function updateDarkModeButton(isDark) {
      const icon = DOM.darkModeToggle.querySelector('i');
      const text = DOM.darkModeToggle.querySelector('.mode-text');
      
      if (icon) icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
      if (text) text.textContent = isDark ? 'Light Mode' : 'Dark Mode';
  }
}

// Back to Top Button
function setupBackToTop() {
  if (!DOM.backToTop) return;

  window.addEventListener('scroll', () => {
      DOM.backToTop.classList.toggle('visible', window.scrollY > 300);
  });

  DOM.backToTop.addEventListener('click', () => {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });
}

// FAQ Accordion
function setupFAQ() {
  DOM.faqQuestions.forEach(question => {
      question.addEventListener('click', () => {
          const answer = question.nextElementSibling;
          const icon = question.querySelector('i');
          
          // Toggle answer
          if (answer.style.maxHeight) {
              answer.style.maxHeight = null;
              icon.className = 'fas fa-chevron-down';
          } else {
              answer.style.maxHeight = answer.scrollHeight + 'px';
              icon.className = 'fas fa-chevron-up';
          }
      });
  });
}

// Newsletter Form
function setupNewsletter() {
  if (!DOM.newsletterForm) return;

  DOM.newsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = DOM.newsletterForm.querySelector('input').value;

      try {
          // Save to Firebase
          await db.collection('newsletters').add({
              email: email,
              date: new Date()
          });

          // Show success
          DOM.newsletterForm.style.display = 'none';
          DOM.newsletterSuccess.style.display = 'flex';

          // Reset after 5 seconds
          setTimeout(() => {
              DOM.newsletterForm.style.display = 'flex';
              DOM.newsletterSuccess.style.display = 'none';
              DOM.newsletterForm.reset();
          }, 5000);
      } catch (error) {
          console.error('Error saving email:', error);
          alert('There was an error subscribing. Please try again.');
      }
  });
}

// Search Functionality
function setupSearch() {
  if (!DOM.searchInput || !DOM.searchResults) return;

  DOM.searchInput.addEventListener('input', debounce(handleSearch, 300));
  DOM.searchButton.addEventListener('click', handleSearch);

  // Close results when clicking outside
  document.addEventListener('click', (e) => {
      if (!DOM.searchInput.contains(e.target) && !DOM.searchResults.contains(e.target)) {
          DOM.searchResults.style.display = 'none';
      }
  });

  function handleSearch() {
      const query = DOM.searchInput.value.trim().toLowerCase();
      
      if (query.length < 2) {
          DOM.searchResults.style.display = 'none';
          return;
      }

      const results = COMICS_DATA.filter(comic => 
          comic.title.toLowerCase().includes(query)
      );

      displaySearchResults(results);
  }

  function displaySearchResults(results) {
      DOM.searchResults.innerHTML = '';
      
      if (results.length === 0) {
          DOM.searchResults.innerHTML = '<div class="no-results">No comics found</div>';
          DOM.searchResults.style.display = 'block';
          return;
      }

      results.forEach(comic => {
          const item = document.createElement('div');
          item.className = 'search-result-item';
          item.innerHTML = `
              <a href="${comic.link}">
                  <img src="${comic.image}" alt="${comic.title}" loading="lazy">
                  <p>${comic.title}</p>
              </a>
          `;
          DOM.searchResults.appendChild(item);
      });

      DOM.searchResults.style.display = 'block';
  }

  // Debounce function to limit search frequency
  function debounce(func, delay) {
      let timeout;
      return function() {
          const context = this;
          const args = arguments;
          clearTimeout(timeout);
          timeout = setTimeout(() => func.apply(context, args), delay);
      };
  }
}

// Animate Stats Counting
function setupStatsAnimation() {
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              animateNumbers();
              observer.unobserve(entry.target);
          }
      });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.about-section');
  if (statsSection) observer.observe(statsSection);

  function animateNumbers() {
      DOM.statNumbers.forEach(element => {
          const target = parseInt(element.getAttribute('data-count'));
          const duration = 2000;
          const step = target / (duration / 16);
          
          let current = 0;
          const counter = setInterval(() => {
              current += step;
              if (current >= target) {
                  clearInterval(counter);
                  current = target;
              }
              element.textContent = Math.floor(current);
          }, 16);
      });
  }
}

// Loading Screen
function setupLoadingScreen() {
  const loadingScreen = document.querySelector('.loading-screen');
  if (!loadingScreen) return;

  setTimeout(() => {
      loadingScreen.style.opacity = '0';
      setTimeout(() => {
          loadingScreen.style.display = 'none';
      }, 500);
  }, 1000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Loading screen
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

