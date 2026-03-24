// Global Toast Logic
window.showToast = (msg) => {
  const toast = document.getElementById("success-toast");
  const messageEl = document.getElementById("toast-message");
  if (!toast || !messageEl) return;

  messageEl.innerText = msg;
  toast.classList.remove("hidden");

  setTimeout(() => {
    toast.classList.remove("translate-x-10", "opacity-0");
  }, 10);

  setTimeout(window.hideToast, 4000);
};

window.hideToast = () => {
  const toast = document.getElementById("success-toast");
  if (!toast) return;

  toast.classList.add("translate-x-10", "opacity-0");
  setTimeout(() => toast.classList.add("hidden"), 300);
};

// Global password toggle logic

// const passwordToggles = document.querySelectorAll(".password-toggle");

// passwordToggles.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     const container = btn.closest(".relative");
//     const input = container ? container.querySelector(".password-input") : null;
//     // Search for the slash line within the button
//     const slashLine = btn.querySelector(".slash-line");

//     if (input && slashLine) {
//       if (input.type === "password") {
//         input.type = "text";
//         // line becomes visible
//         slashLine.classList.remove("opacity-0");
//         slashLine.classList.add("opacity-100");
//         btn.title = "Hide password";
//       } else {
//         input.type = "password";
//         // line becomes hidden
//         slashLine.classList.remove("opacity-100");
//         slashLine.classList.add("opacity-0");
//         btn.title = "Show password";
//       }
//     }
//   });
// });
// Global password toggle logic using Event Delegation
document.addEventListener("click", (e) => {
  // Перевіряємо, чи клікнули на кнопку перемикача або на будь-який елемент всередині неї (наприклад, SVG)
  const btn = e.target.closest(".password-toggle");

  if (!btn) return;

  const container = btn.closest(".relative");
  const input = container ? container.querySelector(".password-input") : null;
  const slashLine = btn.querySelector(".slash-line");

  if (input && slashLine) {
    if (input.type === "password") {
      input.type = "text";
      slashLine.classList.remove("opacity-0");
      slashLine.classList.add("opacity-100");
      btn.title = "Hide password";
    } else {
      input.type = "password";
      slashLine.classList.remove("opacity-100");
      slashLine.classList.add("opacity-0");
      btn.title = "Show password";
    }
  }
});
