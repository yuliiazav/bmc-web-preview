document.addEventListener("DOMContentLoaded", () => {
  const btnAddCert = document.getElementById("add-cert-btn");
  const btnGenerateCsr = document.getElementById("generate-csr-btn");

  // Modal windows
  const modalAdd = document.getElementById("modal-add-certificate");
  const modalCsr = document.getElementById("modal-generate-csr");

  // Open
  const openModal = (modal) => {
    if (modal) {
      modal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    }
  };

  // Close
  const closeModal = (modal) => {
    if (modal) {
      modal.classList.add("hidden");
      document.body.style.overflow = ""; //scrolling back
    }
  };

  // Listeners
  btnAddCert?.addEventListener("click", () => openModal(modalAdd));
  btnGenerateCsr?.addEventListener("click", () => openModal(modalCsr));

  // X or Close btn logic
  document.querySelectorAll(".modal-close").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const modal = e.target.closest(".fixed");
      closeModal(modal);
    });
  });

  // Closing when click on the dark background
  [modalAdd, modalCsr].forEach((modal) => {
    modal?.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  //  Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal(modalAdd);
      closeModal(modalCsr);
    }
  });
  // Show selected file name
  const fileInput = document.getElementById("certificate-file");
  const fileNameDisplay = document.getElementById("file-name-display");

  fileInput?.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
      fileNameDisplay.textContent = e.target.files[0].name;
      fileNameDisplay.classList.remove("text-custom-aside-text");
      fileNameDisplay.classList.add("text-brand-blue", "font-medium");
    } else {
      fileNameDisplay.textContent = "No file chosen";
    }
  });
});
