document.addEventListener("DOMContentLoaded", () => {
  /**
   * Setup Policy Toggles
   * Changes labels and triggers global toast
   */
  const setupPolicyToggle = (id, labelName) => {
    const toggle = document.getElementById(id);
    if (!toggle) return;

    toggle.addEventListener("change", (e) => {
      const isEnabled = e.target.checked;

      // Update the text label next to the toggle
      const labelSpan = toggle
        .closest(".flex")
        .querySelector(".toggle-label-text");
      if (labelSpan) {
        labelSpan.innerText = isEnabled ? "Enabled" : "Disabled";
      }

      // Trigger Global Toast from main.js
      if (typeof window.showToast === "function") {
        const status = isEnabled ? "enabled" : "disabled";
        window.showToast(`${labelName} has been ${status} successfully.`);
      }
    });
  };

  // Initialize all toggles on the page
  setupPolicyToggle("sshSwitch", "BMC shell access");
  setupPolicyToggle("ipmiSwitch", "Network IPMI");
  setupPolicyToggle("vtpmSwitch", "VirtualTPM");
  setupPolicyToggle("rtadSwitch", "RTAD");

  // Handle Session Timeout dropdown
  const timeoutSelect = document.getElementById("session-timeout-options");
  if (timeoutSelect) {
    timeoutSelect.addEventListener("change", (e) => {
      window.showToast(`Web session timeout updated to ${e.target.value}.`);
    });
  }
});
