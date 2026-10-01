function renderGuests(el) {
  const guests = getGuests();
  const byRsvp = { Yes: 0, No: 0, Pending: 0 };
  guests.forEach(g => byRsvp[g.rsvp] = (byRsvp[g.rsvp] || 0) + 1);

  el.innerHTML = `
    <div class="page-head">
      <h1>Guest List</h1>
      <p>${guests.length} guests imported from your spreadsheet, grouped by table.</p>
    </div>
    <div class="grid grid-3">
      <div class="card clickable" data-rsvp="Yes"><div class="stat-value">${byRsvp.Yes}</div><div class="stat-label">RSVP yes</div></div>
      <div class="card clickable" data-rsvp="Pending"><div class="stat-value">${byRsvp.Pending}</div><div class="stat-label">RSVP pending</div></div>
      <div class="card clickable" data-rsvp="No"><div class="stat-value">${byRsvp.No}</div><div class="stat-label">RSVP no</div></div>
    </div>
    <div style="margin-top:18px;" class="card">
      <input type="text" id="guestSearch" placeholder="Search guests..." style="width:100%;">
      <div id="guestFilterNote" style="margin-top:8px; font-size:13px; color:var(--text-muted); display:none;"></div>
    </div>
    <div id="guestGroups"></div>
  `;

  const groupsEl = el.querySelector("#guestGroups");
  const search = el.querySelector("#guestSearch");
  const filterNote = el.querySelector("#guestFilterNote");
  let statusFilter = null;

  function draw(filterText) {
    const filtered = guests
      .map((g, i) => ({ ...g, _index: i }))
      .filter(g => !statusFilter || g.rsvp === statusFilter)
      .filter(g => !filterText || `${g.first} ${g.last} ${g.table}`.toLowerCase().includes(filterText.toLowerCase()));

    const groups = {};
    filtered.forEach(g => { (groups[g.table] = groups[g.table] || []).push(g); });

    groupsEl.innerHTML = Object.keys(groups).sort().map(table => `
      <div class="collapsible" style="margin-top:16px;">
        <div class="collapsible-head section-title" style="margin-bottom:8px;" data-toggle>
          <span>${table} &mdash; ${groups[table].length} guests</span>
          ${ICONS.chevron}
        </div>
        <div class="collapsible-body table-wrap">
          <table>
            <thead><tr><th>Name</th><th>Side</th><th>Priority</th><th>Invite sent</th><th>RSVP</th></tr></thead>
            <tbody>
              ${groups[table].map(g => `
                <tr>
                  <td>${g.first} ${g.last}</td>
                  <td>${g.side}</td>
                  <td><span class="badge ${g.priority === "Must" ? "ok" : "muted"}">${g.priority}</span></td>
                  <td><input type="checkbox" ${g.inviteSent ? "checked" : ""} data-index="${g._index}" data-field="inviteSent"></td>
                  <td>
                    <select data-index="${g._index}" data-field="rsvp">
                      <option value="Pending" ${g.rsvp === "Pending" ? "selected" : ""}>Pending</option>
                      <option value="Yes" ${g.rsvp === "Yes" ? "selected" : ""}>Yes</option>
                      <option value="No" ${g.rsvp === "No" ? "selected" : ""}>No</option>
                    </select>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `).join("") || `<div class="empty-state">No guests match "${filterText}".</div>`;

    groupsEl.querySelectorAll("[data-toggle]").forEach(h => h.addEventListener("click", () => toggleCollapsible(h.closest(".collapsible"))));
  }

  groupsEl.addEventListener("change", e => {
    const t = e.target;
    if (!t.dataset.field) return;
    const patch = {};
    patch[t.dataset.field] = t.dataset.field === "inviteSent" ? t.checked : t.value;
    updateGuest(Number(t.dataset.index), patch);
    renderGuests(el);
  });

  search.addEventListener("input", () => draw(search.value));

  el.querySelectorAll(".card.clickable").forEach(card => card.addEventListener("click", () => {
    const rsvp = card.dataset.rsvp;
    statusFilter = statusFilter === rsvp ? null : rsvp;
    el.querySelectorAll(".card.clickable").forEach(c => c.classList.toggle("active", c.dataset.rsvp === statusFilter));
    filterNote.style.display = statusFilter ? "block" : "none";
    filterNote.textContent = statusFilter ? `Showing only guests with RSVP: ${statusFilter}. Click the card again to clear.` : "";
    draw(search.value);
  }));

  draw("");
}
