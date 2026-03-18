document.addEventListener("DOMContentLoaded", () => {
  // Toggle account policy table visibility and rotate the icon
  const toggleBtn = document.getElementById("toggle-policy-table");
  const container = document.getElementById("policy-table-container");
  const icon = document.getElementById("toggle-icon");

  if (toggleBtn && container && icon) {
    toggleBtn.addEventListener("click", () => {
      const isHidden = container.classList.contains("hidden");

      if (isHidden) {
        container.classList.remove("hidden");
        icon.style.transform = "rotate(-180deg)";
        toggleBtn.classList.add("text-custom-accent");
      } else {
        container.classList.add("hidden");
        icon.style.transform = "rotate(0deg)";
        toggleBtn.classList.remove("text-custom-accent");
      }
    });
  }
});
