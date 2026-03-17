document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("toggle-policy-table");
    const container = document.getElementById("policy-table-container");
    const icon = document.getElementById("toggle-icon");

    if (toggleBtn && container) {
        toggleBtn.addEventListener("click", () => {
            const isHidden = container.classList.contains("hidden");

            if (isHidden) {
                container.classList.remove("hidden");
                icon.style.transform = "rotate(-180deg)"; // Arrow pointing down
            } else {
                container.classList.add("hidden");
                icon.style.transform = "rotate(0deg)"; // Arrow pointing up
            }
        });

        // Initial state: table is hidden, arrow points up
        icon.style.transform = "rotate(0deg)";
    }
});