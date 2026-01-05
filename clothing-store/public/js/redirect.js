let timeLeft = 5;
const countdownEl = document.getElementById("countdown");

const timer = setInterval(() => {
  timeLeft--;

  if (countdownEl) {
    countdownEl.textContent = timeLeft;
  }

  if (timeLeft <= 0) {
    clearInterval(timer);
    window.location.href = "index.html";
  }
}, 1000);
