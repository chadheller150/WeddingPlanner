// Shared helpers that make items across the site clickable/linkable.
// A "link cell" shows an Open link when a URL is saved, otherwise a web-search
// fallback, plus a pencil to set/change it. Saved links persist through each
// tab's existing store overlay, so they survive a refresh.

function searchUrl(q) {
  return "https://www.google.com/search?q=" + encodeURIComponent(q);
}

// Inner HTML for a link cell. `link` = saved URL (or falsy); `query` = text to
// web-search when none is set; `editAttrs` = data-* attributes the host module
// reads to identify the row when the pencil is clicked.
function linkCellHTML(link, query, editAttrs) {
  const open = link
    ? `<a class="item-link" href="${escapeAttr(link)}" target="_blank" rel="noopener" title="Open saved link">${ICONS.external} Open</a>`
    : `<a class="item-link muted" href="${escapeAttr(searchUrl(query))}" target="_blank" rel="noopener" title="Search the web for this item">${ICONS.search} Search</a>`;
  return `${open}<button class="icon-btn link-edit" ${editAttrs} aria-label="Set link" title="${link ? "Edit link" : "Add link"}">${ICONS.pencil}</button>`;
}

// Prompts for a URL. Returns a normalized value (adds https:// if missing),
// "" to clear, or null if the user cancelled.
function promptForLink(current) {
  const v = window.prompt("Paste a link for this item (leave blank to clear):", current || "");
  if (v === null) return null;
  const t = v.trim();
  if (!t) return "";
  return /^https?:\/\//i.test(t) ? t : "https://" + t;
}

// Turns free-text contact into a clickable mailto:/tel:/http link when it looks
// like an email, phone, or URL; otherwise returns the escaped text.
function autoLinkify(text) {
  if (!text) return "";
  const t = String(text).trim();
  if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(t)) return `<a class="item-link" href="mailto:${escapeAttr(t)}">${escapeHtml(t)}</a>`;
  if (/^https?:\/\//i.test(t) || /^www\./i.test(t)) {
    const href = /^https?:\/\//i.test(t) ? t : "https://" + t;
    return `<a class="item-link" href="${escapeAttr(href)}" target="_blank" rel="noopener">${escapeHtml(t)}</a>`;
  }
  const digits = t.replace(/[^\d+]/g, "");
  if (digits.length >= 7 && /^[+\d().\-\s]+$/.test(t)) return `<a class="item-link" href="tel:${escapeAttr(digits)}">${escapeHtml(t)}</a>`;
  return escapeHtml(t);
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function escapeAttr(s) { return escapeHtml(s); }
