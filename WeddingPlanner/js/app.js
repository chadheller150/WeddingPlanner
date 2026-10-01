// App shell: builds the nav drawer, wires tab switching, hamburger, dark mode.
(function () {
  const drawer = document.getElementById("navDrawer");
  const overlay = document.getElementById("navOverlay");
  const navItemsEl = document.getElementById("navItems");

  function buildNav() {
    navItemsEl.innerHTML = NAV_ITEMS.map(item => `
      <div class="nav-item" data-tab="${item.id}">
        ${ICONS[item.icon]}<span>${item.label}</span>
      </div>
    `).join("");
  }

  function setActiveTab(tabId) {
    document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
    document.getElementById(`panel-${tabId}`).classList.add("active");
    document.querySelectorAll(".nav-item").forEach(n => n.classList.toggle("active", n.dataset.tab === tabId));
    window.location.hash = tabId;
    window.scrollTo({ top: 0 });
    renderTab(tabId);
    closeDrawer();
  }

  function renderTab(tabId) {
    const renderers = {
      overview: renderOverview,
      budget: renderBudget,
      guests: renderGuests,
      party: renderParty,
      vendors: renderVendors,
      timeline: renderTimeline,
      venue: renderVenue,
      moodboard: renderMoodboard,
      invites: renderInvites
    };
    const fn = renderers[tabId];
    if (fn) fn(document.getElementById(`panel-${tabId}`));
  }

  function openDrawer() { drawer.classList.add("open"); overlay.classList.add("open"); }
  function closeDrawer() { drawer.classList.remove("open"); overlay.classList.remove("open"); }

  document.getElementById("hamburgerBtn").addEventListener("click", openDrawer);
  overlay.addEventListener("click", closeDrawer);
  navItemsEl.addEventListener("click", e => {
    const item = e.target.closest(".nav-item");
    if (item) setActiveTab(item.dataset.tab);
  });

  // Dark mode: respect saved preference, else system setting.
  const savedTheme = STORE.load("theme", null);
  const systemDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.setAttribute("data-theme", savedTheme || (systemDark ? "dark" : "light"));
  document.getElementById("themeToggle").addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    STORE.save("theme", next);
  });

  // Global helper used by render modules for collapsible sections.
  window.toggleCollapsible = function (el) { el.classList.toggle("closed"); };

  buildNav();
  const initialTab = (window.location.hash || "#overview").replace("#", "");
  setActiveTab(NAV_ITEMS.some(n => n.id === initialTab) ? initialTab : "overview");
})();
