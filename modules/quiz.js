export async function renderQuiz(container) {
  // Load questions from JSON
  const response = await fetch("data/questions.json");
  let questions = await response.json();

  // Shuffle questions (Fisher-Yates algorithm)
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  questions = shuffleArray(questions);

  let currentIndex = 0;
  let score = 0;

  container.innerHTML = `
    <div class="quiz-container card shadow border-0 p-4 mb-5">
      <div id="quiz-question"></div>
      <ul id="quiz-options" class="list-group my-3"></ul>
      <button id="submit-btn" class="btn btn-primary">Submit</button>
      <div id="feedback" class="mt-3"></div>
      <button id="next-btn" class="btn btn-primary mt-3 d-none">Next</button>
    </div>
  `;

  const questionEl = container.querySelector("#quiz-question");
  const optionsEl = container.querySelector("#quiz-options");
  const feedbackEl = container.querySelector("#feedback");
  const submitBtn = container.querySelector("#submit-btn");
  const nextBtn = container.querySelector("#next-btn");

  function showQuestion() {
    const q = questions[currentIndex];

    // Shuffle options too if خواستی
    const shuffledOptions = shuffleArray([...q.options]);

    questionEl.innerHTML = `<h5>${q.question}</h5>`;
    optionsEl.innerHTML = shuffledOptions
      .map(
        (opt, i) => `
        <li class="list-group-item">
          <input type="radio" name="option" id="opt${i}" value="${i}">
          <label for="opt${i}" class="ms-2">${opt}</label>
        </li>`
      )
      .join("");

    // Store index of correct answer after shuffling
    q.correctIndex = shuffledOptions.indexOf(q.options[q.answer]);

    feedbackEl.innerHTML = "";
    submitBtn.disabled = false;
    nextBtn.classList.add("d-none");
  }

  function checkAnswer() {
    const selected = container.querySelector("input[name='option']:checked");
    if (!selected) {
      feedbackEl.innerHTML = `<div class="alert alert-warning">Please select an option!</div>`;
      return;
    }

    const answerIndex = parseInt(selected.value);
    const q = questions[currentIndex];

    // Log for debugging
    console.log("Current question answer index:", q.correctIndex);
    console.log("Selected index:", answerIndex);
    console.log("Options:", q.options);

    if (answerIndex === q.correctIndex) {
      score++;
      feedbackEl.innerHTML = `
        <div class="alert alert-success">
          ✅ Correct!
          <br><strong>Explanation:</strong> ${q.explanation}
        </div>
      `;
    } else {
      feedbackEl.innerHTML = `
        <div class="alert alert-danger">
          ❌ Wrong! The correct answer was: <strong>${q.options[q.answer]}</strong>
          <br><strong>Explanation:</strong> ${q.explanation}
        </div>
      `;
    }

    submitBtn.disabled = true;
    nextBtn.classList.remove("d-none");
  }

  function nextQuestion() {
    currentIndex++;
    if (currentIndex < questions.length) {
      showQuestion();
    } else {
      container.innerHTML = `
        <div class="card p-4 text-center">
          <h3>Quiz Finished!</h3>
          <p>Your Score: ${score} / ${questions.length}</p>
        </div>
      `;
    }
  }

  submitBtn.addEventListener("click", checkAnswer);
  nextBtn.addEventListener("click", nextQuestion);

  // Start with first question
  showQuestion();
}
