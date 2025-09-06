import { renderNavbar } from "./modules/navbar.js";

// Render navbar
document.querySelector("#navbar-container").innerHTML = renderNavbar();

import { renderHeroSection } from "./modules/heroSection.js";

// Render heroSection
const heroContent = {
    //  title: "Ready to test your knowledge?",
    description: "Answer questions, track your score, and challenge yourself!",
    buttonText: "Start Quiz",
    buttonLink: "#quiz"
}

document.querySelector("#root").innerHTML += renderHeroSection(heroContent);


import { renderQuiz } from "./modules/quiz.js";

const quizContainer = document.getElementById("quiz-container");
if (quizContainer) {
  renderQuiz(quizContainer);
} else {
  console.error("Quiz container not found!");
}

 

