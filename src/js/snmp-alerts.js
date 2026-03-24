document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal-add-snmp");
  const openBtn = document.getElementById("btn-add-snmp-destination");
  const closeBtns = document.querySelectorAll(".modal-close-snmp");

  const openModal = () => {
    modal.classList.remove("hidden");
  };

  const closeModal = () => {
    modal.classList.add("hidden");
  };

  openBtn.addEventListener("click", openModal);

  closeBtns.forEach((btn) => {
    btn.addEventListener("click", closeModal);
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
});
