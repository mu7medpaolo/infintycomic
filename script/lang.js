// Language translations
const translations = {
  en: {
    title: "Infinity Comics",
    home: "Home",
    about: "About",
    featured: "SERIES",
    classics: "Classics",
    searchPlaceholder: "Search comics...",
    darkMode: "Dark Mode",
    welcome: "Welcome to Infinity Comics",
    discover: "Discover the best collection of comics from Marvel!",
    explore: "Explore Now",
    newReleases: "New Releases",
    searchResults: "Search Results",
    subscribe: "Subscribe to our Newsletter",
    updates: "Get updates on new comics and exclusive offers!",
    emailPlaceholder: "Your email address",
    subscribeButton: "Subscribe",
    slogan: "Your ultimate destination for digital comics",
    quickLinks: "Quick Links",
    legal: "Legal",
    terms: "Terms of Use",
    privacy: "Privacy Policy",
    follow: "Follow Us",
    copyright: "© 2025 Infinity Comics. All rights reserved.",
    loading: "Loading...",
    preparing: "Preparing your comics experience...",
    disclaimer: "All images and content are property of their respective owners. This site is for educational purposes only."
  },
  ar: {
    title: "إنفينيتي كوميكس",
    home: "الرئيسية",
    about: "من نحن",
    featured: "مميز",
    classics: "كلاسيكيات",
    searchPlaceholder: "ابحث عن القصص المصورة...",
    darkMode: "الوضع المظلم",
    welcome: "مرحبًا بكم في إنفينيتي كوميكس",
    discover: "اكتشف أفضل مجموعة من القصص المصورة من مارفل!",
    explore: "استكشف الآن",
    newReleases: "الإصدارات الجديدة",
    searchResults: "نتائج البحث",
    subscribe: "اشترك في نشرتنا البريدية",
    updates: "احصل على تحديثات حول القصص المصورة الجديدة والعروض الحصرية!",
    emailPlaceholder: "عنوان بريدك الإلكتروني",
    subscribeButton: "اشترك",
    slogan: "وجهتك النهائية للقصص المصورة الرقمية",
    quickLinks: "روابط سريعة",
    legal: "قانوني",
    terms: "شروط الاستخدام",
    privacy: "سياسة الخصوصية",
    follow: "تابعنا",
    copyright: "© 2025 إنفينيتي كوميكس. جميع الحقوق محفوظة.",
    loading: "جاري التحميل...",
    preparing: "نحن نجهز تجربة الكوميكس الخاصة بك...",
    disclaimer: "جميع الصور والمحتويات مملوكة لأصحابها. هذا الموقع لأغراض تعليمية فقط."
  }
};

// Language switcher functionality
document.addEventListener("DOMContentLoaded", function () {
  const languageSelect = document.getElementById("language-select");

  // Set initial language based on browser preference or saved preference
  const savedLanguage =
    localStorage.getItem("language") ||
    (navigator.language.startsWith("ar") ? "ar" : "en");
  languageSelect.value = savedLanguage;
  changeLanguage(savedLanguage);

  // Add event listener for language change
  languageSelect.addEventListener("change", function () {
    const selectedLanguage = this.value;
    localStorage.setItem("language", selectedLanguage);
    changeLanguage(selectedLanguage);
  });
});

// Function to change language
function changeLanguage(language) {
  // Update body class for RTL/LTR
  document.body.classList.toggle("rtl", language === "ar");

  // Update text elements
  document.querySelectorAll("[data-translate]").forEach((element) => {
    const key = element.getAttribute("data-translate");
    if (translations[language][key]) {
      element.textContent = translations[language][key];
    }
  });

  // Update placeholder texts
  document.querySelectorAll("[data-translate-placeholder]").forEach((element) => {
    const key = element.getAttribute("data-translate-placeholder");
    if (translations[language][key]) {
      element.setAttribute("placeholder", translations[language][key]);
    }
  });

  // Update title
  document.title = translations[language]["title"];
}
// Function to change language
function changeLanguage(language) {
  // Update body class for RTL/LTR
  document.body.classList.toggle("rtl", language === "ar");

  // Update text elements
  document.querySelectorAll("[data-translate]").forEach((element) => {
    const key = element.getAttribute("data-translate");
    if (translations[language][key]) {
      element.textContent = translations[language][key];
    }
  });

  // Update placeholder texts
  document.querySelectorAll("[data-translate-placeholder]").forEach((element) => {
    const key = element.getAttribute("data-translate-placeholder");
    if (translations[language][key]) {
      element.setAttribute("placeholder", translations[language][key]);
    }
  });

  // Update title
  document.title = translations[language]["title"];
}

// Example: Dynamically update loading text
document.querySelector(".loading-text").textContent = translations["en"]["loading"];
changeLanguage("ar"); // Example to switch to Arabic