const initAWAR3 = () => {
  const navToggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  if (navToggle instanceof HTMLButtonElement && nav instanceof HTMLElement) {
    navToggle.onclick = () => {
      const open = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    };
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const revealItems = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const board = document.querySelector("[data-mission-board]");
  const output = board?.querySelector("[data-mission-output]");
  const tabs = Array.from(board?.querySelectorAll("[data-tab-index]") || []);
  if (board instanceof HTMLElement && output instanceof HTMLElement && board.dataset.missionPayload) {
    const payload = JSON.parse(board.dataset.missionPayload);
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const index = Number(tab.getAttribute("data-tab-index") || "0");
        const item = payload[index];
        tabs.forEach((candidate) => {
          const active = candidate === tab;
          candidate.classList.toggle("active", active);
          candidate.setAttribute("aria-selected", String(active));
        });
        output.innerHTML = `
          <p class="readout">Selected Field / ${String(index + 1).padStart(2, "0")}</p>
          <h3>${item.title}</h3>
          <p>${item.copy}</p>
          <div class="tag-row">${item.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
        `;
      });
    });
  }
};

initAWAR3();
