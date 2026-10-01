// Lightweight localStorage persistence layer. Each key holds a JSON blob that
// a render-*.js module reads/writes. This is local-to-this-browser for now —
// when the site becomes a shared/public wedding website, swap STORE.save/load
// for calls to a real backend without touching the render modules.
const STORE = {
  _key(name) { return `wp_${name}`; },
  load(name, fallback) {
    try {
      const raw = localStorage.getItem(this._key(name));
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  },
  save(name, value) {
    localStorage.setItem(this._key(name), JSON.stringify(value));
  }
};

// Returns guest-edit overlays (rsvp/inviteSent/table) merged onto the base data.js list.
function getGuests() {
  const overlay = STORE.load("guests_overlay", {});
  return WEDDING.guests.map((g, i) => ({ ...g, ...(overlay[i] || {}) }));
}
function updateGuest(index, patch) {
  const overlay = STORE.load("guests_overlay", {});
  overlay[index] = { ...(overlay[index] || {}), ...patch };
  STORE.save("guests_overlay", overlay);
}

function getBudget() {
  const overlay = STORE.load("budget_overlay", {});
  const categories = WEDDING.budget.categories.map((cat, ci) => ({
    ...cat,
    items: cat.items.map((it, ii) => {
      const key = `${ci}-${ii}`;
      return { ...it, ...(overlay[key] || {}) };
    })
  }));
  return { categories };
}
function updateBudgetItem(ci, ii, patch) {
  const overlay = STORE.load("budget_overlay", {});
  const key = `${ci}-${ii}`;
  overlay[key] = { ...(overlay[key] || {}), ...patch };
  STORE.save("budget_overlay", overlay);
}

function getVendors() {
  return STORE.load("vendors", WEDDING.vendors);
}
function saveVendors(list) { STORE.save("vendors", list); }

function getChecklist() {
  const overlay = STORE.load("checklist_overlay", {});
  return WEDDING.checklist.map((t, i) => ({ ...t, ...(overlay[i] || {}) }));
}
function updateChecklistItem(index, patch) {
  const overlay = STORE.load("checklist_overlay", {});
  overlay[index] = { ...(overlay[index] || {}), ...patch };
  STORE.save("checklist_overlay", overlay);
}

function getPaperGoods() {
  const overlay = STORE.load("papergoods_overlay", {});
  return WEDDING.paperGoods.map((t, i) => ({ ...t, ...(overlay[i] || {}) }));
}
function updatePaperGood(index, patch) {
  const overlay = STORE.load("papergoods_overlay", {});
  overlay[index] = { ...(overlay[index] || {}), ...patch };
  STORE.save("papergoods_overlay", overlay);
}

function getMoodboard() { return STORE.load("moodboard", []); }
function saveMoodboard(list) { STORE.save("moodboard", list); }

function getVenueLayout() { return STORE.load("venue_layout", null); }
function saveVenueLayout(layout) { STORE.save("venue_layout", layout); }
