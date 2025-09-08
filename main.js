
import { renderNavbar } from "./modules/navbar.js";
import { renderHeroSection } from "./modules/heroSection.js";
import { renderQuiz } from "./modules/quiz.js";

// Render Navbar
document.querySelector("#navbar-container").innerHTML = renderNavbar();


const heroContent = {
    description: "Answer questions, track your score, and challenge yourself!",
    buttonText: "Start Quiz",
    buttonLink: "#quiz"  
};

// Render Hero
document.querySelector("#root").innerHTML += renderHeroSection(heroContent);


// Render quiz
const quizContainer = document.getElementById("quiz");

document.querySelector(".btn-start-quiz").addEventListener("click", (e) => {
    e.preventDefault(); 
    quizContainer.scrollIntoView({ behavior: "smooth" });

    renderQuiz(quizContainer);
});
