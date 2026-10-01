function renderParty(el) {
  el.innerHTML = `
    <div class="page-head">
      <h1>Wedding Party</h1>
      <p>${WEDDING.weddingParty.length} people standing with you.</p>
    </div>
    <div class="grid grid-3" id="partyCards"></div>
  `;
  el.querySelector("#partyCards").innerHTML = WEDDING.weddingParty.map(p => `
    <div class="card">
      ${ICONS.party}
      <div class="title serif" style="font-size:16px; margin-top:8px;">${p.name}</div>
      <div class="stat-label" style="margin-top:4px;">${p.role}</div>
      <div style="margin-top:6px; font-size:13px; color:var(--text-muted);">${p.side}</div>
    </div>
  `).join("");
}
