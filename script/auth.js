// DOM Elements
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const logoutBtn = document.getElementById('logout-btn');
const userProfile = document.getElementById('user-profile');
const usernameSpan = document.getElementById('username');
const userAvatar = document.getElementById('user-avatar');

// Modal Elements
const loginModal = document.getElementById('login-modal');
const signupModal = document.getElementById('signup-modal');
const closeModalBtns = document.querySelectorAll('.close-modal');
const showSignupLink = document.getElementById('show-signup');
const showLoginLink = document.getElementById('show-login');

// Forms
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

// Check auth state
auth.onAuthStateChanged(user => {
  if (user) {
    // User is signed in
    loginBtn.style.display = 'none';
    signupBtn.style.display = 'none';
    logoutBtn.style.display = 'block';
    userProfile.style.display = 'flex';
    
    // Display user info
    usernameSpan.textContent = user.displayName || user.email;
    userAvatar.src = user.photoURL || 'imags comics/default-avatar.png';
    
    // Save user data to Firestore
    db.collection('users').doc(user.uid).set({
      email: user.email,
      name: user.displayName || '',
      lastLogin: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
  } else {
    // User is signed out
    loginBtn.style.display = 'block';
    signupBtn.style.display = 'block';
    logoutBtn.style.display = 'none';
    userProfile.style.display = 'none';
  }
});

// Event Listeners
loginBtn.addEventListener('click', () => {
  loginModal.style.display = 'block';
});

signupBtn.addEventListener('click', () => {
  signupModal.style.display = 'block';
});

logoutBtn.addEventListener('click', () => {
  auth.signOut().then(() => {
    showNotification('Logged out successfully');
  }).catch(error => {
    showNotification(error.message);
  });
});

closeModalBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    loginModal.style.display = 'none';
    signupModal.style.display = 'none';
  });
});

showSignupLink.addEventListener('click', (e) => {
  e.preventDefault();
  loginModal.style.display = 'none';
  signupModal.style.display = 'block';
});

showLoginLink.addEventListener('click', (e) => {
  e.preventDefault();
  signupModal.style.display = 'none';
  loginModal.style.display = 'block';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === loginModal) {
    loginModal.style.display = 'none';
  }
  if (e.target === signupModal) {
    signupModal.style.display = 'none';
  }
});

// Login Form
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      loginModal.style.display = 'none';
      loginForm.reset();
      showNotification('Logged in successfully');
    })
    .catch(error => {
      showNotification(error.message);
    });
});

// Signup Form
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('signup-confirm-password').value;
  
  if (password !== confirmPassword) {
    showNotification('Passwords do not match');
    return;
  }
  
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Update user profile with name
      return userCredential.user.updateProfile({
        displayName: name
      });
    })
    .then(() => {
      signupModal.style.display = 'none';
      signupForm.reset();
      showNotification('Account created successfully');
    })
    .catch(error => {
      showNotification(error.message);
    });
});

// Helper function to show notifications
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('fade-out');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}