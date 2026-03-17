//============================================
// Overview Page Logic
//============================================
document.addEventListener("DOMContentLoaded", () => {
    // --- 1. PCB Monitor Logic (Overview Page) ---
    const pcbContainer = document.getElementById("server-pcb");
    const tooltip = document.getElementById("pcb-tooltip");
    const btnError = document.getElementById("btn-error");
    const btnFix = document.getElementById("btn-fix");
    // Initial PCB state and status styles to replace then with real data from backend when available
    if (pcbContainer) {
        let systemState = [{
                id: "cpu-1-group",
                name: "CPU 1",
                status: "ok",
                info: "Intel Xeon | Temp: 40°C",
            },
            {
                id: "cpu-2-group",
                name: "CPU 2",
                status: "default",
                info: "Intel Xeon | Idle",
            },
            {
                id: "dimm-a3",
                name: "DIMM A3",
                status: "warning",
                info: "Bad ECC | Status: Warning",
            },
            {
                id: "temp-sensor",
                name: "Sensor",
                status: "pulse",
                info: "Ambient: 24°C",
            },
        ];

        const statusStyles = {
            ok: { stroke: "#10B981", fill: "#10B981", pulse: false },
            warning: { stroke: "#F59E0B", fill: "#F59E0B", pulse: false },
            error: { stroke: "#EF4444", fill: "#EF4444", pulse: true },
            pulse: { stroke: "#10B981", fill: "#10B981", pulse: true },
            default: { stroke: "#334155", fill: "#334155", pulse: false },
        };

        function updatePCB() {
            systemState.forEach((item) => {
                const el = document.getElementById(item.id);
                if (!el) return;

                const style = statusStyles[item.status];
                const shapes = el.querySelectorAll("rect, circle, path");

                shapes.forEach((shape) => {
                    shape.setAttribute("stroke", style.stroke);
                    if (shape.tagName !== "rect") shape.setAttribute("fill", style.fill);
                });

                if (style.pulse) el.classList.add("animate-pulse");
                else el.classList.remove("animate-pulse");

                el.setAttribute("data-info", `${item.name}: ${item.info}`);
            });
        }

        // Buttons to simulate status changes (for demo purposes)
        if (btnError) {
            btnError.addEventListener("click", () => {
                const cpu2 = systemState.find((i) => i.id === "cpu-2-group");
                if (cpu2) {
                    cpu2.status = "error";
                    cpu2.info = "OVERHEAT! Temp: 98°C";
                    updatePCB();
                }
            });
        }

        if (btnFix) {
            btnFix.addEventListener("click", () => {
                systemState = systemState.map((item) => ({...item, status: "ok" }));
                updatePCB();
            });
        }

        // Tooltip logic for PCB components
        document.querySelectorAll("[data-info]").forEach((el) => {
            el.addEventListener("mousemove", (e) => {
                if (!tooltip) return;
                const rect = pcbContainer.getBoundingClientRect();
                tooltip.classList.remove("hidden");
                tooltip.innerHTML = el.getAttribute("data-info");
                tooltip.style.left = e.clientX - rect.left + 20 + "px";
                tooltip.style.top = e.clientY - rect.top + 20 + "px";
            });
            el.addEventListener("mouseleave", () => {
                if (tooltip) tooltip.classList.add("hidden");
            });
        });

        updatePCB(); // Initial render of PCB with default statuses
    }
});