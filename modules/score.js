
// ذخیره پیشرفت در localStorage
export function saveProgress(progress) {
  localStorage.setItem("quizProgress", JSON.stringify(progress));
}

// بارگیری پیشرفت از localStorage
export function loadProgress() {
  const data = localStorage.getItem("quizProgress");
  return data ? JSON.parse(data) : null;
}

// پاک‌کردن پیشرفت
export function clearProgress() {
  localStorage.removeItem("quizProgress");
}

// مدیریت تایمر 
let timerInterval = null;

// شروع تایمر با فرمت MM:SS
export function startTimer(container, durationInSec, onTick, onFinish) {
  let timeLeft = durationInSec;
  
 // تبدیل ثانیه به دقیقه:ثانیه
  function formatTime(sec) {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

   // نمایش زمان اولیه
  container.textContent = `⏰ Time Left: ${formatTime(timeLeft)}`;
  
  // اجرای تایمر هر ثانیه
  timerInterval = setInterval(() => {
    timeLeft--;
    container.textContent = `⏰ Time Left: ${formatTime(timeLeft)}`;

    if (onTick) onTick(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      if (onFinish) onFinish();
    }
  }, 1000);

  // تابع توقف تایمر و بازگرداندن زمان سپری‌شده
  return () => {
    clearInterval(timerInterval);
    return durationInSec - timeLeft;
  };
}

// توقف تایمر (بدون محاسبه زمان سپری‌شده)
export function stopTimer() {
  if (timerInterval) clearInterval(timerInterval);
}
