 document.addEventListener("DOMContentLoaded", () => {
  const toolbar = document.getElementById("sessions-toolbar");
  const selectAll = document.getElementById("select-all-sessions");
  const selectedCountText = document.getElementById("selected-count");
  const modalDisconnect = document.getElementById("modal-confirm-disconnect");
  const modalText = document.getElementById("disconnect-modal-text");
  
  // Helper to get all row checkboxes
  const getCheckboxes = () => document.querySelectorAll('input[name="session-select"]');

  // --- Modal Control Functions ---
  
  const openDisconnectModal = (count) => {
    if (modalText) {
      modalText.innerHTML = `Are you sure you want to disconnect <span class="font-bold text-brand-blue">${count}</span> session${count > 1 ? "s" : ""}? This action cannot be undone.`;
    }
    modalDisconnect?.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  const closeDisconnectModal = () => {
    modalDisconnect?.classList.add("hidden");
    document.body.style.overflow = ""; // Restore scrolling
  };

  // --- Modal Event Listeners ---

  // Close modal via buttons (X and Cancel)
  modalDisconnect?.querySelectorAll(".close-modal").forEach((btn) => {
    btn.addEventListener("click", closeDisconnectModal);
  });

  // Close modal when clicking on the darkened backdrop
  modalDisconnect?.addEventListener("click", (e) => {
    if (e.target === modalDisconnect) {
      closeDisconnectModal();
    }
  });

  // --- Toolbar and Checkbox Logic ---

  const updateToolbar = () => {
    const checkboxes = getCheckboxes();
    const checkedCount = [...checkboxes].filter((cb) => cb.checked).length;

    if (checkedCount > 0) {
      toolbar?.classList.remove("hidden");
      if (selectedCountText) selectedCountText.innerText = `${checkedCount} Selected`;
      // Update "Select All" state based on individual checkboxes
      if (selectAll) selectAll.checked = checkedCount === checkboxes.length;
    } else {
      toolbar?.classList.add("hidden");
      if (selectAll) selectAll.checked = false;
    }
  };

  // Select/Deselect all rows
  if (selectAll) {
    selectAll.addEventListener("change", (e) => {
      getCheckboxes().forEach((cb) => (cb.checked = e.target.checked));
      updateToolbar();
    });
  }

  // Delegate change event for row checkboxes (supports dynamic rows)
  document.querySelector("#sessions-table tbody")?.addEventListener("change", (e) => {
    if (e.target.name === "session-select") {
      updateToolbar();
    }
  });

  // --- Action Buttons ---

  // Disconnect a single session from the table row
  document.querySelectorAll(".btn-single-disconnect").forEach((btn) => {
    btn.addEventListener("click", () => openDisconnectModal(1));
  });

  // Bulk disconnect from the toolbar
  document.getElementById("btn-bulk-disconnect")?.addEventListener("click", () => {
    const checkedCount = [...getCheckboxes()].filter((cb) => cb.checked).length;
    openDisconnectModal(checkedCount);
  });

  // Cancel selection from the toolbar
  document.getElementById("btn-cancel-selection")?.addEventListener("click", () => {
    getCheckboxes().forEach((cb) => (cb.checked = false));
    if (selectAll) selectAll.checked = false;
    updateToolbar();
  });

  // Final confirmation inside the modal
  document.getElementById("confirm-disconnect-action")?.addEventListener("click", () => {
    // Show success toast notification
    if (window.showToast) {
      window.showToast("Sessions disconnected successfully");
    }
    
    closeDisconnectModal();

    // Reset selection and toolbar after action
    getCheckboxes().forEach((cb) => (cb.checked = false));
    if (selectAll) selectAll.checked = false;
    updateToolbar();
    
 
  });
});