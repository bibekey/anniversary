const CORRECT_PASS = "7780";

document.addEventListener("DOMContentLoaded", () => {
  const isAuth = sessionStorage.getItem("anniversary_auth");
  const overlay = document.getElementById("password-overlay");
  const input = document.getElementById("pass-input");

  if (isAuth === "true" && overlay) {
    overlay.style.display = "none";
  }

  // Allow press 'Enter' to submit password
  if (input) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") checkPassword();
    });
  }

  // Spawn floating hearts periodically
  setInterval(createHeart, 600);
});

function checkPassword() {
  const input = document.getElementById("pass-input");
  const error = document.getElementById("pass-error");
  const overlay = document.getElementById("password-overlay");

  if (input && input.value.trim() === CORRECT_PASS) {
    sessionStorage.setItem("anniversary_auth", "true");
    
    // Smooth fade-out effect
    if (overlay) {
      overlay.style.opacity = "0";
      setTimeout(() => {
        overlay.style.display = "none";
      }, 400);
    }
  } else if (error) {
    error.style.display = "block";
    
    // Trigger CSS shake re-animation
    error.style.animation = "none";
    error.offsetHeight; // Reflow
    error.style.animation = "shake 0.4s ease-in-out";
  }
}

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  
  // Variety in heart visuals
  const icons = ["💖", "💗", "✨", "💕"];
  heart.innerHTML = icons[Math.floor(Math.random() * icons.length)];
  
  // Randomize styling dynamics
  const left = Math.random() * 100;
  const duration = Math.random() * 3 + 4; // 4s - 7s duration
  const size = Math.random() * 12 + 14; // 14px - 26px font size
  
  heart.style.left = `${left}vw`;
  heart.style.animationDuration = `${duration}s`;
  heart.style.fontSize = `${size}px`;
  
  document.body.appendChild(heart);

  // Clean up DOM node post-animation
  setTimeout(() => heart.remove(), duration * 1000);
}