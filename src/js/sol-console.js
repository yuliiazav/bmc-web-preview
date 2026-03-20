//============================================
// SOL Console Page Logic
//============================================
document.addEventListener("DOMContentLoaded", () => {
  // --- Baud Rate Button Logic (SOL Console Page) ---
  const baudButtons = document.querySelectorAll(".baud-rate-btn");
  if (baudButtons.length > 0) {
    baudButtons.forEach((button) => {
      button.addEventListener("click", () => {
        baudButtons.forEach((btn) => {
          btn.classList.remove("bg-[#1eb054]", "text-white");
          btn.classList.add("bg-[#9f9f9fbd]", "text-custom-border");
        });
        button.classList.remove("bg-[#9f9f9fbd]", "text-custom-border");
        button.classList.add("bg-[#1eb054]", "text-white");
      });
    });
  }
});
