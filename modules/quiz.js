// js/modules/quiz.js
export async function renderQuiz(container) {
  if (!container) return;

  const response = await fetch("./data/questions.json");
  if (!response.ok) {
    container.innerHTML = "<p class='text-danger'>Failed to load questions.</p>";
    return;
  }
  const questionsAll = await response.json();

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  const questions = shuffle(questionsAll).slice(0, 10);

  let currentQuestion = 0;
  let score = 0;

  function showQuestion() {
    const q = questions[currentQuestion];

    container.innerHTML = `
      <div class="card shadow p-4 mb-3">
        <h4 class="mb-3">${q.question}</h4>
        <div class="options d-flex flex-column gap-2">
          ${q.options.map((opt, index) => `
            <div class="form-check">
              <input class="form-check-input option-radio" type="radio" name="quiz-option" value="${index}" id="opt${index}">
              <label class="form-check-label" for="opt${index}">${opt}</label>
            </div>
          `).join("")}
        </div>
        <button class="btn btn-primary mt-3 submit-btn">Submit Answer</button>
        <div class="feedback mt-3"></div>
        <button class="btn btn-success mt-3 next-btn" style="display:none;">Next Question</button>
      </div>
    `;

    const submitBtn = container.querySelector(".submit-btn");
    const nextBtn = container.querySelector(".next-btn");
    const feedback = container.querySelector(".feedback");
    const radios = container.querySelectorAll(".option-radio");
    let answered = false;

    submitBtn.addEventListener("click", () => {
      if (answered) return;
      answered = true;

      const selectedRadio = Array.from(radios).find(r => r.checked);
      if (!selectedRadio) {
        alert("Please select an option!");
        answered = false;
        return;
      }

      const selectedIndex = parseInt(selectedRadio.value);

      if (selectedIndex === q.answer) {
        score++;
        feedback.innerHTML = `<div class="alert alert-success" style="white-space: pre-line;">${q.explanation}</div>`;
      } else {
        feedback.innerHTML = `<div class="alert alert-danger" style="white-space: pre-line;">❌ Wrong! The correct answer is ${q.options[q.answer]}\n\n🔎 Explanation:\n\n${q.explanation}</div>`;
      }

      // غیرفعال کردن همه رادیوها و دکمه submit
      radios.forEach(r => r.disabled = true);
      submitBtn.disabled = true;
      nextBtn.style.display = "inline-block";
    });

    nextBtn.addEventListener("click", () => {
      currentQuestion++;
      if (currentQuestion < questions.length) {
        showQuestion();
      } else {
        container.innerHTML = `<div class="alert alert-info">🎉 Quiz finished! Your score: <strong>${score}/${questions.length}</strong></div>`;
      }
    });
  }

  showQuestion();
}
