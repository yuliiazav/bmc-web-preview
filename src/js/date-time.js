document.addEventListener("DOMContentLoaded", () => {
  const radioManual = document.getElementById("radio-mode-manual");
  const radioNtp = document.getElementById("radio-mode-ntp");

  const manualInputs = [
    document.getElementById("input-manual-date"),
    document.getElementById("input-manual-time"),
  ];
  const ntpInputs = document.querySelectorAll('[id^="input-ntp-"]');

  const updateStates = () => {
    const isManual = radioManual.checked;

    // Toggle Manual inputs state
    manualInputs.forEach((input) => {
      if (input) input.disabled = !isManual;
    });

    // Toggle NTP inputs state
    ntpInputs.forEach((input) => {
      if (input) input.disabled = isManual;
    });
  };

  radioManual?.addEventListener("change", updateStates);
  radioNtp?.addEventListener("change", updateStates);

  updateStates(); // Initial check
});