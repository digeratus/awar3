(function(){
  const config = window.AWAR3_CONFIG || {
    companyName: "AWAR3",
    contactEmail: "info@awar3.com",
    contactLabel: "info@awar3.com",
    linkedinUrl: "#",
    contactSubject: "AWAR3 inquiry"
  };

  document.querySelectorAll("[data-company-name]").forEach((el) => {
    el.textContent = config.companyName;
  });

  document.querySelectorAll("[data-contact-link]").forEach((el) => {
    el.href = `mailto:${config.contactEmail}?subject=${encodeURIComponent(config.contactSubject || "AWAR3 inquiry")}`;
  });

  document.querySelectorAll("[data-contact-label]").forEach((el) => {
    el.textContent = config.contactLabel || config.contactEmail;
  });

  document.querySelectorAll("[data-contact-email]").forEach((el) => {
    el.textContent = config.contactEmail;
  });

  const navToggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealItems.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const modeButtons = document.querySelectorAll("[data-mode-button]");
  const board = document.querySelector("[data-board]");
  const modeTitle = document.querySelector("[data-mode-title]");
  const modeDescription = document.querySelector("[data-mode-description]");
  const tagsContainer = document.querySelector("[data-mode-tags]");
  const modeCounter = document.querySelector("[data-mode-counter]");

  function renderMode(button, index) {
    const payloadRaw = button.getAttribute("data-mode-payload");
    if (!payloadRaw) return;
    let payload;
    try {
      payload = JSON.parse(payloadRaw);
    } catch (error) {
      payload = { label: button.textContent.trim(), description: "", tags: [] };
    }
    modeButtons.forEach((b) => b.classList.toggle("active", b === button));
    if (board) {
      board.classList.remove("mode-0", "mode-1", "mode-2");
      board.classList.add(`mode-${index}`);
    }
    if (modeTitle) modeTitle.textContent = payload.label;
    if (modeDescription) modeDescription.textContent = payload.description;
    if (modeCounter) modeCounter.textContent = `${String(index + 1).padStart(2, "0")} / ${String(modeButtons.length).padStart(2, "0")}`;
    if (tagsContainer) {
      tagsContainer.innerHTML = "";
      (payload.tags || []).forEach((tag) => {
        const span = document.createElement("span");
        span.className = "mini-tag";
        span.textContent = tag;
        tagsContainer.appendChild(span);
      });
    }
  }

  modeButtons.forEach((button, index) => {
    button.addEventListener("click", () => renderMode(button, index));
  });

  const activeButton = document.querySelector("[data-mode-button].active") || modeButtons[0];
  if (activeButton) {
    const initialIndex = Array.from(modeButtons).indexOf(activeButton);
    renderMode(activeButton, Math.max(initialIndex, 0));
  }
})();