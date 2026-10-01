function renderOverview(el) {
  const guests = getGuests();
  const confirmed = guests.filter(g => g.rsvp === "Yes").length;
  const budget = getBudget();
  let totalEstimated = 0, totalActual = 0;
  budget.categories.forEach(c => c.items.forEach(it => {
    totalEstimated += Number(it.estimated) || 0;
    totalActual += Number(it.actual) || 0;
  }));
  const checklist = getChecklist();
  const done = checklist.filter(t => t.status === "Done").length;

  const d = WEDDING.details || {};
  const dateObj = WEDDING.weddingDate ? new Date(WEDDING.weddingDate + "T00:00:00") : null;
  const dateLabel = dateObj ? dateObj.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" }) : "Date TBD";
  const daysOut = dateObj ? Math.max(0, Math.ceil((dateObj - new Date()) / 86400000)) : null;

  el.innerHTML = `
    <div class="page-head">
      <h1>${WEDDING.names.fullA || "Chad"} &amp; ${WEDDING.names.fullB || "Eric"}</h1>
      <p>${WEDDING.hashtag ? WEDDING.hashtag + " &middot; " : ""}${dateLabel}${d.venue ? " &middot; " + d.venue + ", " + (d.city || "") : ""}</p>
      <div style="display:flex; flex-wrap:wrap; gap:10px; margin-top:10px; align-items:center;">
        ${daysOut != null ? `<span class="badge ok" style="font-size:13px;">${daysOut} days to go</span>` : ""}
        ${d.ceremonyTime ? `<span class="badge muted">Ceremony ${d.ceremonyTime}</span>` : ""}
        ${d.attire ? `<span class="badge muted">${d.attire}</span>` : ""}
        ${d.zolaUrl ? `<a class="item-link" href="${escapeAttr(d.zolaUrl)}" target="_blank" rel="noopener">${ICONS.external} Zola site</a>` : ""}
        ${d.mapUrl ? `<a class="item-link muted" href="${escapeAttr(d.mapUrl)}" target="_blank" rel="noopener">${ICONS.external} Map &amp; directions</a>` : ""}
      </div>
    </div>

    <div class="grid grid-4">
      <div class="card clickable" data-tab="guests">
        <div class="stat-value">${guests.length}</div>
        <div class="stat-label">Guests on list</div>
      </div>
      <div class="card clickable" data-tab="guests">
        <div class="stat-value">${confirmed}</div>
        <div class="stat-label">RSVPs confirmed</div>
      </div>
      <div class="card clickable" data-tab="budget">
        <div class="stat-value">$${totalEstimated.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
        <div class="stat-label">Budget estimated</div>
      </div>
      <div class="card clickable" data-tab="timeline">
        <div class="stat-value">${done}/${checklist.length}</div>
        <div class="stat-label">Checklist tasks done</div>
      </div>
    </div>

    <div class="section-title">Sections</div>
    <div class="nav-cards" id="overviewNavCards"></div>

    <div class="section-title">Ideas Board</div>
    <div class="card">
      ${WEDDING.notesIdeas.map(n => `<p style="margin:6px 0;">&mdash; ${n.idea}</p>`).join("")}
    </div>
  `;

  const cardsEl = el.querySelector("#overviewNavCards");
  cardsEl.innerHTML = NAV_ITEMS.filter(n => n.id !== "overview").map(item => `
    <div class="nav-card" data-tab="${item.id}">
      ${ICONS[item.icon]}
      <div class="title">${item.label}</div>
      <div class="sub">${navSubtitle(item.id)}</div>
    </div>
  `).join("");
  cardsEl.addEventListener("click", e => {
    const card = e.target.closest(".nav-card");
    if (card) document.querySelector(`.nav-item[data-tab="${card.dataset.tab}"]`).click();
  });

  el.querySelectorAll(".card.clickable").forEach(c => c.addEventListener("click", () => {
    document.querySelector(`.nav-item[data-tab="${c.dataset.tab}"]`).click();
  }));
}

function navSubtitle(id) {
  const map = {
    budget: "Spend by category",
    guests: `${getGuests().length} on the list`,
    party: `${WEDDING.weddingParty.length} standing with you`,
    vendors: "Contracts & payments",
    timeline: "Checklist & day-of plan",
    venue: "Seating & decor layout",
    moodboard: "Inspiration & palette",
    invites: "Stationery & paper goods"
  };
  return map[id] || "";
}
