 document.addEventListener("DOMContentLoaded", () => {
  /**
   * 1. DATA STORE
   */
  const interfaceData = {
    bond0: { linkStatus: "NoLink", speed: "65535", fqdn: "ast2600-default", mac: "72:47:7e:cc:7f:d6", dhcp: true, ipv4: [] },
    eth0: { linkStatus: "Link Up", speed: "1000", fqdn: "ast2600-default", mac: "00:15:5D:01:20:A1", dhcp: false, ipv4: [] },
    eth1: {
      linkStatus: "NoLink", speed: "0", fqdn: "ast2600-default", mac: "00:15:5D:01:20:B2", dhcp: true,
      ipv4: [
        { ip: "192.168.1.105", gw: "192.168.1.1", mask: "255.255.255.0", origin: "Static" },
        { ip: "10.0.0.15", gw: "10.0.0.1", mask: "255.255.255.0", origin: "DHCP" },
      ],
    },
  };

  let currentInterface = "bond0";

  /**
   * HELPER: Update Toggle Text Label
   */
  const updateToggleLabel = (toggle, isEnabled) => {
    const labelSpan = toggle.closest(".flex")?.querySelector(".toggle-label-text");
    if (labelSpan) {
      labelSpan.innerText = isEnabled ? "Enabled" : "Disabled";
    }
  };

  /**
   * 2. INTERFACE SWITCHING (Tabs Logic)
   */
  const setupInterfaceSwitching = () => {
    const buttons = document.querySelectorAll("[data-interface]");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const iface = btn.getAttribute("data-interface");
        currentInterface = iface;
        const data = interfaceData[iface];

        if (!data) return;

        // Update Tab Styles
        buttons.forEach((b) => {
          b.classList.remove("border-b-[3px]", "border-brand-blue", "font-medium", "text-custom-text", "bg-custom-aside-bg");
          b.classList.add("border-b", "border-custom-divider", "font-normal", "text-custom-aside-text");
        });

        btn.classList.add("border-b-[3px]", "border-brand-blue", "font-medium", "text-custom-text", "bg-custom-aside-bg");
        btn.classList.remove("border-b", "border-custom-divider", "font-normal", "text-custom-aside-text");

        // Update Interface Details
        document.getElementById("val-link-status").innerText = data.linkStatus;
        document.getElementById("val-speed").innerText = data.speed;
        document.getElementById("val-fqdn").innerText = data.fqdn;
        document.getElementById("val-mac").innerText = data.mac;

        // Update DHCP Toggle State and Label
        const dhcpToggle = document.getElementById("switch-dhcp");
        if (dhcpToggle) {
          dhcpToggle.checked = data.dhcp;
          updateToggleLabel(dhcpToggle, data.dhcp);
        }

        // Update IPv4 Table
        const tableBody = document.querySelector("tbody");
        if (tableBody) {
          if (data.ipv4.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="4" class="px-6 py-4 text-center text-custom-aside-text">No IPv4 addresses configured</td></tr>`;
          } else {
            tableBody.innerHTML = data.ipv4.map((row) => `
              <tr>
                <td class="px-6 py-4">${row.ip}</td> 
                <td class="px-6 py-4">${row.gw}</td>
                <td class="px-6 py-4">${row.mask}</td>
                <td class="px-6 py-4">${row.origin}</td>
              </tr>
            `).join("");
          }
        }
      });
    });
  };

  /**
   * 3. TOGGLE SWITCH LOGIC
   */
  const setupToggle = (id, label) => {
    const toggle = document.getElementById(id);
    if (!toggle) return;

    // Оновлюємо лейбл відразу при ініціалізації
    updateToggleLabel(toggle, toggle.checked);

    toggle.addEventListener("change", (e) => {
      const isChecked = e.target.checked;

      if (id === "switch-dhcp") {
        if (!isChecked) {
          document.getElementById("modal-disable-dhcp")?.classList.remove("hidden");
        } else {
          interfaceData[currentInterface].dhcp = true;
          updateToggleLabel(toggle, true);
          window.showToast?.(`Successfully enabled ${label}.`);
        }
      } else {
        const status = isChecked ? "enabled" : "disabled";
        updateToggleLabel(toggle, isChecked);
        window.showToast?.(`Successfully ${status} ${label} settings.`);
      }
    });
  };

  /**
   * DHCP Revert/Confirm Logic
   */
  const revertDhcpToggle = () => {
    const dhcpToggle = document.getElementById("switch-dhcp");
    if (dhcpToggle) {
      dhcpToggle.checked = true;
      updateToggleLabel(dhcpToggle, true);
    }
    document.getElementById("modal-disable-dhcp")?.classList.add("hidden");
  };

  document.getElementById("btn-confirm-disable-dhcp")?.addEventListener("click", () => {
    const dhcpToggle = document.getElementById("switch-dhcp");
    interfaceData[currentInterface].dhcp = false;
    if (dhcpToggle) updateToggleLabel(dhcpToggle, false);
    document.getElementById("modal-disable-dhcp")?.classList.add("hidden");
    window.showToast?.("Successfully disabled DHCP.");
  });

  /**
   * 4. EDIT MODAL LOGIC
   */
  const openEditModal = (targetId, title, label) => {
    const modal = document.getElementById("modal-edit-field");
    const input = document.getElementById("edit-modal-input");
    if (!modal || !input) return;

    document.getElementById("edit-modal-title").innerText = title;
    document.getElementById("edit-modal-label").innerText = label;
    input.value = document.getElementById(targetId)?.innerText.trim() || "";
    
    modal.dataset.currentTargetId = targetId; // зберігаємо ID цілі в датасеті модалки
    modal.classList.remove("hidden");
    input.focus();
  };

  document.getElementById("btn-edit-hostname")?.addEventListener("click", () => openEditModal("val-hostname", "Edit hostname", "Hostname"));
  document.getElementById("btn-edit-mac")?.addEventListener("click", () => openEditModal("val-mac", "Edit MAC address", "MAC address"));

  document.getElementById("btn-save-field")?.addEventListener("click", () => {
    const modal = document.getElementById("modal-edit-field");
    const input = document.getElementById("edit-modal-input");
    const targetId = modal.dataset.currentTargetId;

    if (targetId && input) {
      const cleanValue = input.value.trim();
      document.getElementById(targetId).innerText = cleanValue;
      if (targetId === "val-mac") interfaceData[currentInterface].mac = cleanValue;
      window.showToast?.("Settings updated successfully.");
      modal.classList.add("hidden");
    }
  });

  /**
   * 5. SIMPLE MODALS (Add IP)
   */
  const setupSimpleModal = (btnId, modalId) => {
    const btn = document.getElementById(btnId);
    const modal = document.getElementById(modalId);
    if (btn && modal) {
      btn.addEventListener("click", () => modal.classList.remove("hidden"));
    }
  };

  setupSimpleModal("btn-add-ipv4-address-ip", "modal-ipv4-address-ip");
  setupSimpleModal("btn-add-dns-ip-address", "modal-dns-address-ip");

  // Global Close
  document.querySelectorAll(".modal-close").forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".fixed");
      if (modal?.id === "modal-disable-dhcp") {
        revertDhcpToggle();
      } else {
        modal?.classList.add("hidden");
      }
    });
  });

  // INITIALIZATION
  setupInterfaceSwitching();
  setupToggle("switch-ntp", "NTP server");
  setupToggle("switch-dns", "DNS server");
  setupToggle("switch-domain", "domain name");
  setupToggle("switch-dhcp", "DHCP");
});
