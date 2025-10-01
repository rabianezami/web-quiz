import { renderNavbar } from "./modules/navbar.js";
import { renderHeroSection } from "./modules/heroSection.js";
import { renderQuiz } from "./modules/quiz.js";

async function initApp() {
  // گرفتن سوالات
  const response = await fetch("data/questions.json");
  const questions = await response.json();

  // استخراج سکشن‌ها
  const uniqueSections = [...new Set(questions.map(q => q.section))];

  // Navbar
  const navbarContainer = document.querySelector("#navbar-container");
  if (navbarContainer) {
    navbarContainer.innerHTML = renderNavbar(uniqueSections);
  }

  // بررسی صفحه فعلی
  const page = document.body.dataset.page;

  if (page === "index") {
    // فقط در index.html
    const root = document.querySelector("#root");
    if (root) {
      const heroContent = {
        description: "Answer questions, track your score, and challenge yourself!",
        buttonText: "Start Quiz",
        buttonLink: "quiz.html?section=HTML"
      };
      root.innerHTML += renderHeroSection(heroContent);

      const startBtn = document.querySelector(".btn-start-quiz");
      if (startBtn) {
        startBtn.addEventListener("click", (e) => {
          e.preventDefault();
          // باز کردن quiz.html در همان تب با سکشن HTML پیش‌فرض
          window.location.href = "quiz.html?section=HTML";
        });
      }
    }
  }

  if (page === "quiz") {
    // فقط در quiz.html
    const quizContainer = document.getElementById("quiz");
    if (quizContainer) {
      // گرفتن سکشن از URL
      const urlParams = new URLSearchParams(window.location.search);
      const section = urlParams.get("section") || "HTML";

      // صدا زدن renderQuiz با سکشن موردنظر
      renderQuiz(quizContainer, section);
    }
  }
}

// اجرای برنامه
initApp();
