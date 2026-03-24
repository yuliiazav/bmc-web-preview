 document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal-confirm-action");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-description");
  const confirmBtn = document.getElementById("modal-btn-confirm");
  const cancelBtn = document.getElementById("modal-btn-cancel");
  const closeX = document.getElementById("modal-close-x");

  // Setup action configurations
  const actions = {
    "btn-reboot-ipdesk": {
      title: "Confirm Reboot",
      text: "Are you sure you want to reboot the IPDesk?",
      btnClass: "bg-brand-blue", // Blue button for important but not dangerous actions
      hoverClass: "hover:bg-custom-hover-bg",
      action: () => console.log("Rebooting IPDesk..."),
    },
    "btn-remote-pc-off": {
      title: "Power Off PC",
      text: "Are you sure you want to power OFF the remote PC?",
      btnClass: "bg-[#EF4345]", // Red button for dangerous actions
      hoverClass: "hover:bg-[#d93a3c]",
      action: () => console.log("Powering OFF..."),
    },
    "btn-remote-pc-on": {
      title: "Power On PC",
      text: "Do you want to send a power ON signal to the remote PC?",
      btnClass: "bg-[#23C45F]", // Greebn button for safe actions
      hoverClass: "hover:bg-[#1eb054]",
      action: () => console.log("Powering ON..."),
    },
  };

  let currentAction = null;

  // Open modal on button click
  Object.keys(actions).forEach((id) => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener("click", () => {
        const config = actions[id];
        currentAction = config.action;

        // Update modal content
        modalTitle.innerText = config.title;
        modalDesc.innerText = config.text;

        // Update confirm button style
        confirmBtn.className = `px-8 py-2.5 text-white text-sm font-medium rounded-full transition-all shadow-md active:scale-95 ${config.btnClass} ${config.hoverClass}`;

        modal.classList.remove("hidden");
      });
    }
  });

  // Close modal
  const closeModal = () => modal.classList.add("hidden");

  cancelBtn.addEventListener("click", closeModal);
  closeX.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Confirm action
  confirmBtn.addEventListener("click", () => {
    if (currentAction) currentAction();
    closeModal();
  });
});

