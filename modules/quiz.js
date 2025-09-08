import { saveProgress, loadProgress, clearProgress, startTimer, stopTimer } from "./score.js";
import { renderResult } from "./result.js"; 

export async function renderQuiz(container) {
  // گرفتن سوالات از فایل JSON
  const response = await fetch("data/questions.json");
  let questions = await response.json();

  // تابع شافل برای بهم زدن ترتیب سوالات و گزینه‌ها
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // بارگیری وضعیت ذخیره شده
  let progress = loadProgress();

  if (!progress?.questionsShuffled) {
    // فقط یک بار سوالات شافل شوند
    const questionsShuffled = shuffleArray(questions);
    progress = {
      questionsShuffled,
      currentIndex: 0,
      score: 0,
      timeRecords: [],
      answers: [] 
    };
    saveProgress(progress);
  }

   // مقادیر اولیه
  questions = progress.questionsShuffled;
  let currentIndex = progress.currentIndex;
  let score = progress.score;
  let timeRecords = progress.timeRecords;
  
  // ساختار HTML کویز
  container.innerHTML = `
    <div class="quiz-container d-flex card shadow border-0 p-4 m-5">
      <div id="quiz-question"></div>
      <ul id="quiz-options" class="list-group text-start"></ul>
      <div class="d-flex justify-content-between mt-3">
        <div><button id="submit-btn" class="btn btn-primary">Submit</button></div>
        <div id="quiz-timer" class="mb-2"></div>
      </div>
      <div id="feedback" class="mt-3"></div>
      <button id="next-btn" class="btn btn-primary mt-3 d-none">Next</button>
    </div>
  `;

  // گرفتن المنت‌ها
  const timerEl = container.querySelector("#quiz-timer");
  const submitBtn = container.querySelector("#submit-btn");
  const nextBtn = container.querySelector("#next-btn");
  const feedbackEl = container.querySelector("#feedback");
  const questionEl = container.querySelector("#quiz-question");
  const optionsEl = container.querySelector("#quiz-options");

  let stopCurrentTimer;
  let shuffledOptions = [];

  // نمایش سوال
  function showQuestion() {
    if (currentIndex >= questions.length) {
      // پایان کوییز → رفتن به صفحه نتیجه
      renderResult(container, score, questions.length);
      return;
    }

    const q = questions[currentIndex];
    shuffledOptions = shuffleArray([...q.options]); 
    q.correctIndex = shuffledOptions.indexOf(q.options[q.answer]);

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

    feedbackEl.innerHTML = "";
    submitBtn.disabled = false;
    nextBtn.classList.add("d-none");

    // تایمر (۲ دقیقه برای هر سوال)
    const prevTime = timeRecords[currentIndex] || 0;
    const timeLeft = 120 - prevTime;

    stopCurrentTimer = startTimer(
      timerEl,
      timeLeft,
      null,
      () => {
        submitBtn.disabled = true;
        feedbackEl.innerHTML = `<div class="alert alert-danger">⏰ Time is up for this question!</div>`;
        timeRecords[currentIndex] = 120;
        saveProgress({ questionsShuffled: questions, currentIndex, score, timeRecords, answers: progress.answers });
        nextBtn.classList.remove("d-none");
      }
    );

    // ذخیره وضعیت فعلی
    saveProgress({ questionsShuffled: questions, currentIndex, score, timeRecords, answers: progress.answers });
  }

  // تابع بررسی جواب کاربر
  function checkAnswer() {
    const selected = container.querySelector("input[name='option']:checked");
    if (!selected) {
      feedbackEl.innerHTML = `<div class="alert alert-warning">Please select an option!</div>`;
      return;
    }

    const answerIndex = parseInt(selected.value);
    const q = questions[currentIndex];

    // توقف تایمر و ذخیره زمان سپری‌شده
    const elapsedTime = stopCurrentTimer();
    timeRecords[currentIndex] = elapsedTime;

    // ذخیره جواب کاربر
    if (!progress.answers) progress.answers = [];
    progress.answers[currentIndex] = {
      question: q.question,
      selected: shuffledOptions[answerIndex],   
      correctAnswer: q.options[q.answer],       
      correct: answerIndex === q.correctIndex   
    };

    // بررسی درست یا غلط بودن
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
          ❌ Wrong! Correct: <strong>${q.options[q.answer]}</strong>
          <br><strong>Explanation:</strong> ${q.explanation}
        </div>
      `;
    }

    submitBtn.disabled = true;
    nextBtn.classList.remove("d-none");

    // ذخیره پیشرفت کامل
    saveProgress({
      questionsShuffled: questions,
      currentIndex,
      score,
      timeRecords,
      answers: progress.answers
    });
  }

  // سوال بعدی
  function nextQuestion() {
    currentIndex++;
    saveProgress({ questionsShuffled: questions, currentIndex, score, timeRecords, answers: progress.answers });
    showQuestion();
  }

  // اتصال دکمه‌ها
  submitBtn.addEventListener("click", checkAnswer);
  nextBtn.addEventListener("click", nextQuestion);

  // شروع کویز
  showQuestion();
}
