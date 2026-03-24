 document.addEventListener("DOMContentLoaded", () => {
  // Element for modals and overlay
  const overlay = document.getElementById("modal-overlay");
  const modalAddUser = document.getElementById("modal-add-user");
  const modalPolicy = document.getElementById("modal-policy-settings");

  const btnOpenAddUser = document.getElementById("btn-open-add-user");
  const btnOpenPolicy = document.getElementById("btn-open-policy-settings");

  // users table body
  const userTableBody = document.querySelector("table tbody");

  // --- functions ---

  const openModal = (modal) => {
    if (!modal || !overlay) return;
    overlay.classList.remove("hidden");
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  };

  const closeAllModals = () => {
    if (overlay) overlay.classList.add("hidden");
    if (modalAddUser) modalAddUser.classList.add("hidden");
    if (modalPolicy) modalPolicy.classList.add("hidden");
    document.body.style.overflow = "";
  };

  // --- events handlers ---

  // Opening modals
  if (btnOpenAddUser && modalAddUser) {
    btnOpenAddUser.addEventListener("click", () => openModal(modalAddUser));
  }
  if (btnOpenPolicy && modalPolicy) {
    btnOpenPolicy.addEventListener("click", () => openModal(modalPolicy));
  }

  if (overlay) {
    overlay.addEventListener("click", closeAllModals);
  }

  document.querySelectorAll(".close-modal").forEach((btn) => {
    btn.addEventListener("click", closeAllModals);
  });

  // Logic for "Automatic after timeout"
  const unlockRadios = document.querySelectorAll('input[name="unlock-method"]');
  const timeoutContainer = document.getElementById("timeout-input-container");
  const timeoutInput = document.getElementById("lockout-duration");
  const timeoutError = document.getElementById("timeout-error");

  unlockRadios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      const isAutomatic = e.target.value === "Automatic after timeout";

      if (isAutomatic && timeoutContainer && timeoutInput) {
        // make the field active
        timeoutContainer.classList.remove("opacity-50", "pointer-events-none");
        timeoutInput.classList.remove("bg-gray-50");
        timeoutInput.removeAttribute("disabled");
      } else if (timeoutContainer && timeoutInput) {
        // make the field inactive (Manual)
        timeoutContainer.classList.add("opacity-50", "pointer-events-none");
        timeoutInput.classList.add("bg-gray-50");
        timeoutInput.setAttribute("disabled", "true");

        // reset the error and value
        timeoutInput.value = "";
        if (timeoutError) timeoutError.classList.add("hidden");
        timeoutInput.classList.remove("border-red-500");
      }
    });
  });

  // Validation of the value
  if (timeoutInput) {
    timeoutInput.addEventListener("input", (e) => {
      const value = parseInt(e.target.value);
      if (value < 1) {
        if (timeoutError) timeoutError.classList.remove("hidden");
        timeoutInput.classList.add("border-red-500");
      } else {
        if (timeoutError) timeoutError.classList.add("hidden");
        timeoutInput.classList.remove("border-red-500");
      }
    });
  }

  // --- Add User ---
  const btnCreateUser = document.getElementById("btn-create-user");
  if (btnCreateUser) {
    btnCreateUser.addEventListener("click", () => {
      const usernameInput = document.getElementById("new-user-name-add-input");
      const privilegeInput = document.getElementById("new-user-privilege");
      const passInput = document.getElementById("newuser-password");
      const confirmInput = document.getElementById("newuser-password-confirmation");

      if (!usernameInput) return;

      const username = usernameInput.value.trim();
      const privilege = privilegeInput ? privilegeInput.value : "";
      const statusActive = document.querySelector('input[name="acc-status"]:checked');
      const status = statusActive ? statusActive.value : "Enabled";

      if (!username) {
        alert("Please enter a username");
        return;
      }

      if (userTableBody && userTableBody.querySelector('td[colspan="4"]')) {
        userTableBody.innerHTML = "";
      }

      const newRow = document.createElement("tr");
      newRow.className = "hover:bg-custom-light-bg transition-colors border-b border-custom-divider group";
      newRow.innerHTML = `
                <td class="p-4 w-[50px]">
                    <input type="checkbox" style="accent-color: var(--color-custom-accent);" class="w-4 h-4 rounded border-custom-divider cursor-pointer">
                </td>
                <td class="p-4 text-sm text-custom-text font-medium">${username}</td>
                <td class="p-4 text-sm text-custom-text">${privilege || "No role"}</td>
                <td class="p-4">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status === "Enabled" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}">
                        ${status}
                    </span>
                </td>
            `;

      if (userTableBody) userTableBody.appendChild(newRow);

      // clear inputs
      usernameInput.value = "";
      if (passInput) passInput.value = "";
      if (confirmInput) confirmInput.value = "";
      if (privilegeInput) privilegeInput.value = "";

      closeAllModals();

      if (window.showToast) window.showToast(`User ${username} created!`);
    });
  }

  // --- Logic for toggling policy table ---
  const togglePolicyBtn = document.getElementById("toggle-policy-table");
  const policyTableContainer = document.getElementById("policy-table-container");
  const arrowIcon = document.getElementById("toggle-icon");

  if (togglePolicyBtn && policyTableContainer) {
    togglePolicyBtn.addEventListener("click", () => {
      const isHidden = policyTableContainer.classList.toggle("hidden");
      if (arrowIcon) {
        arrowIcon.style.transform = isHidden ? "rotate(0deg)" : "rotate(-180deg)";
      }
      togglePolicyBtn.classList.toggle("text-custom-accent", !isHidden);
    });
  }

  // Change placeholder color for privilege select
  if (privilegeSelect) {
    privilegeSelect.addEventListener("change", function () {
      if (this.value !== "") {
        this.classList.remove("text-custom-aside-text");
        this.classList.add("text-custom-text");
      } else {
        this.classList.remove("text-custom-text");
        this.classList.add("text-custom-aside-text");
      }
    });
  }
});