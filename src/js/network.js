 document.addEventListener("DOMContentLoaded", () => {
    /**
     * 1. DATA STORE
     */
    const interfaceData = {
        "bond0": {
            linkStatus: "NoLink",
            speed: "65535",
            fqdn: "ast2600-default",
            mac: "72:47:7e:cc:7f:d6",
            dhcp: true,
            ipv4: []
        },
        "eth0": {
            linkStatus: "Link Up",
            speed: "1000",
            fqdn: "ast2600-default",
            mac: "00:15:5D:01:20:A1",
            dhcp: false,
            ipv4: []
        },
        "eth1": {
            linkStatus: "NoLink",
            speed: "0",
            fqdn: "ast2600-default",
            mac: "00:15:5D:01:20:B2",
            dhcp: true,
            ipv4: [
                { ip: "192.168.1.105", gw: "192.168.1.1", mask: "255.255.255.0", origin: "Static" },
                { ip: "10.0.0.15", gw: "10.0.0.1", mask: "255.255.255.0", origin: "DHCP" }
            ]
        }
    };

    let currentInterface = "bond0";

    /**
     * 2. TOAST NOTIFICATIONS
     */
    window.showToast = (msg) => {
        const toast = document.getElementById("success-toast");
        const messageEl = document.getElementById("toast-message");
        if (!toast || !messageEl) return;

        messageEl.innerText = msg;
        toast.classList.remove("hidden");
        
        setTimeout(() => {
            toast.classList.remove("translate-x-10", "opacity-0");
        }, 10);

        setTimeout(hideToast, 4000);
    };

    window.hideToast = () => {
        const toast = document.getElementById("success-toast");
        if (!toast) return;
        
        toast.classList.add("translate-x-10", "opacity-0");
        setTimeout(() => toast.classList.add("hidden"), 300);
    };

    /**
     * 3. INTERFACE SWITCHING (Tabs)
     */
    const setupInterfaceSwitching = () => {
        const buttons = document.querySelectorAll("[data-interface]");
        
        buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                const iface = btn.getAttribute("data-interface");
                currentInterface = iface;
                const data = interfaceData[iface];

                if (!data) return;

                // Tabs styles updates
                buttons.forEach(b => {
                   
                    b.classList.remove("border-b-[3px]", "border-brand-blue", "font-medium", "text-custom-text", "bg-custom-aside-bg");
                    b.classList.add("border-b", "border-custom-divider", "font-normal", "text-custom-aside-text");
                });
                
                btn.classList.add("border-b-[3px]", "border-brand-blue", "font-medium", "text-custom-text", "bg-custom-aside-bg");
                btn.classList.remove("border-b", "border-custom-divider", "font-normal", "text-custom-aside-text");

                // Text data update
                document.getElementById("val-link-status").innerText = data.linkStatus;
                document.getElementById("val-speed").innerText = data.speed;
                document.getElementById("val-fqdn").innerText = data.fqdn;
                document.getElementById("val-mac").innerText = data.mac;

                // Update DHCP toggle
                const dhcpToggle = document.getElementById("switch-dhcp");
                if (dhcpToggle) dhcpToggle.checked = data.dhcp;

                // Update table for IPv4
                const tableBody = document.querySelector("tbody");
                if (tableBody) {
                    if (data.ipv4.length === 0) {
                        tableBody.innerHTML = `<tr><td colspan="4" class="px-6 py-4 text-center text-custom-aside-text">No IPv4 addresses configured</td></tr>`;
                    } else {
                        tableBody.innerHTML = data.ipv4.map(row => `
                            <tr>
                                <td class="px-6 py-4">${row.ip}</td>
                                <td class="px-6 py-4">${row.gw}</td>
                                <td class="px-6 py-4">${row.mask}</td>
                                <td class="px-6 py-4">${row.origin}</td>
                            </tr>
                        `).join('');
                    }
                }
            });
        });
    };

    /**
     * 4. TOGGLE SWITCH LOGIC
     */
    const setupToggle = (id, label) => {
        const toggle = document.getElementById(id);
        if (!toggle) return;

        toggle.addEventListener("change", (e) => {
            const isChecked = e.target.checked;
            
            if (id === "switch-dhcp") {
                if (!isChecked) {
                    document.getElementById("modal-disable-dhcp")?.classList.remove("hidden");
                } else {
                    interfaceData[currentInterface].dhcp = true;
                    showToast(`Successfully enabled ${label}.`);
                }
            } else {
                const status = isChecked ? "enabled" : "disabled";
                showToast(`Successfully ${status} ${label} settings.`);
            }
        });
    };

    const revertDhcpToggle = () => {
        const dhcpToggle = document.getElementById("switch-dhcp");
        if (dhcpToggle) dhcpToggle.checked = true;
        document.getElementById("modal-disable-dhcp")?.classList.add("hidden");
    };

    document.getElementById("btn-confirm-disable-dhcp")?.addEventListener("click", () => {
        interfaceData[currentInterface].dhcp = false;
        document.getElementById("modal-disable-dhcp")?.classList.add("hidden");
        showToast("Successfully disabled DHCP.");
    });

    /**
     * 5. EDIT MODAL LOGIC
     */
    const editModal = document.getElementById("modal-edit-field");
    const editInput = document.getElementById("edit-modal-input");
    const saveFieldBtn = document.getElementById("btn-save-field");
    let currentTargetId = "";

    const openEditModal = (targetId, title, label) => {
        if (!editModal || !editInput) return;
        currentTargetId = targetId;
        document.getElementById("edit-modal-title").innerText = title;
        document.getElementById("edit-modal-label").innerText = label;
        editInput.value = document.getElementById(targetId)?.innerText || "";
        editModal.classList.remove("hidden");
        editInput.focus();
    };

    document.getElementById("btn-edit-hostname")?.addEventListener("click", () => openEditModal("val-hostname", "Edit hostname", "Hostname"));
    document.getElementById("btn-edit-mac")?.addEventListener("click", () => openEditModal("val-mac", "Edit MAC address", "MAC address"));

    saveFieldBtn?.addEventListener("click", () => {
        if (currentTargetId && editInput) {
            document.getElementById(currentTargetId).innerText = editInput.value;
            if (currentTargetId === "val-mac") interfaceData[currentInterface].mac = editInput.value;
            showToast("Settings updated successfully.");
            editModal.classList.add("hidden");
        }
    });

    /**
     * 6. CLOSING MODALS
     */
    document.querySelectorAll(".modal-close").forEach((btn) => {
        btn.addEventListener("click", () => {
            const modal = btn.closest('.fixed');
            if (modal?.id === "modal-disable-dhcp") revertDhcpToggle();
            else modal?.classList.add("hidden");
        });
    });

    // Modals for Add buttons
    document.getElementById("btn-add-ipv4-address-ip")?.addEventListener("click", () => document.getElementById("modal-ipv4-address-ip").classList.remove("hidden"));
    document.getElementById("btn-add-dns-ip-address")?.addEventListener("click", () => document.getElementById("modal-dns-address-ip").classList.remove("hidden"));

    // INIT
    setupInterfaceSwitching();
    setupToggle("switch-ntp", "NTP server");
    setupToggle("switch-dns", "DNS server");
    setupToggle("switch-domain", "domain name");
    setupToggle("switch-dhcp", "DHCP");
});