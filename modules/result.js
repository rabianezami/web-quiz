// گرفتن تابع ذخیره‌سازی از فایل score.js
import { saveProgress } from "./score.js";

// تابع نمایش نتیجه نهایی کوییز
export function renderResult(container, score, total) {
  const percent = ((score / total) * 100).toFixed(1);

  // نمایش نتیجه در صفحه
  container.innerHTML = `
    <div class="result-box border-0 p-4 m-2 text-center">
      
      <h1>Result:</h1>
      <p class="text-sm">${score} of ${total}</p>
      <p class="fw-bold">${percent}%</p>
      <p class="text-muted mt-3">${getMessage(score, total)}</p>

      <!-- دکمه‌ها -->
      <div class="mt-2 d-flex justify-content-center gap-2">
        <button id="check-answers" class="btn">Check Your Answers</button>
        <button id="try-again" class="btn">Try Again</button>
        <button id="back-quiz" class="btn">Back to Quizzes</button>
      </div>
    </div>
  `;

  // رویداد دکمه‌ها
  container.querySelector("#check-answers").addEventListener("click", () => {
    renderAnswers(container);
  });

  container.querySelector("#try-again").addEventListener("click", () => {
    saveProgress(null);
    location.reload();
  });

  container.querySelector("#back-quiz").addEventListener("click", () => {
    saveProgress(null);
    window.location.href = "index.html"; 
  });
}

// تولید پیام بر اساس درصد امتیاز
function getMessage(score, total) {
  const percent = (score / total) * 100;
  if (percent === 100) return "Perfect! Outstanding job!";
  if (percent >= 80) return "Great work! Just a little more.";
  if (percent >= 50) return "Almost! Study a little more and take the test again.";
  return " Keep practicing! Don’t give up.";
}

// نمایش لیست جواب‌های کاربر
function renderAnswers(container) {
  const data = JSON.parse(localStorage.getItem("quizProgress"));
  if (!data || !data.answers) {
    container.innerHTML = `<p class="text-danger mt-3">❌ No answer data available.</p>`;
    return;
  }

  const answers = data.answers;
  // نمایش تمام سوال‌ها همراه با جواب درست و جواب انتخابی کاربر
  container.innerHTML = `
    <div class="answers-box card shadow border-0 p-4">
      <h4 class="mb-3">Your Answers</h4>
      <ul class="list-group list-group-flush">
        ${answers
          .map(
            (a, i) => `
          <li class="list-group-item">
            <strong>Q${i + 1}:</strong> ${a.question}<br>
            <span class="${a.correct ? "text-success" : "text-danger"}">
              Your Answer: ${a.selected}
            </span><br>
            <span class="text-primary">Correct Answer: ${a.correctAnswer}</span>
          </li>`
          )
          .join("")}
      </ul>
      <!-- دکمه برگشت -->
      <div class="mt-3 text-center">
        <button class="btn back" onclick="location.reload()"> Back</button>
      </div>
    </div>
  `;
}
