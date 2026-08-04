(() => {
  const root = document.querySelector("[data-mobile-candidate]");
  if (!root) return;

  const button = root.querySelector("[data-mobile-menu-button]");
  const nav = root.querySelector("[data-mobile-nav]");
  if (!button || !nav) return;

  const closeMenu = () => {
    root.classList.remove("mobile-menu-open");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Open navigation");
  };

  button.addEventListener("click", () => {
    const open = root.classList.toggle("mobile-menu-open");
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
})();
