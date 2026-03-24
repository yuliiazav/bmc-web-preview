  document.addEventListener("DOMContentLoaded", () => {
      const saveBtn = document.getElementById("btn-save-profile-settings");

      if (saveBtn) {
          saveBtn.addEventListener("click", () => {
              const selectedTimezone = document.querySelector('input[name="timezone-preference"]:checked') ?.value;

              if (typeof window.showToast === "function") {
                  window.showToast("Profile settings updated successfully.");
              } else {
                  alert("Profile settings updated successfully.");
              }
          });
      }
  });