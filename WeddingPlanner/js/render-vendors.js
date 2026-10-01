function renderVendors(el) {
  const vendors = getVendors();

  el.innerHTML = `
    <div class="page-head">
      <h1>Vendors &amp; Contracts</h1>
      <p>Your sheet didn't have vendor details yet &mdash; the Checklist tab still lists Venue, Photographer, and Catering as open bookings. Add each vendor here as you book them.</p>
    </div>
    <div class="card" style="margin-bottom:18px;">
      <div class="grid grid-3" id="vendorForm">
        <input type="text" id="vName" placeholder="Vendor / business name">
        <input type="text" id="vCategory" placeholder="Category (e.g. Catering)">
        <input type="text" id="vContact" placeholder="Contact email or phone">
        <select id="vStatus">
          <option>Researching</option>
          <option>Contacted</option>
          <option>Booked</option>
          <option>Paid in full</option>
        </select>
        <input type="date" id="vDue" placeholder="Payment due">
        <input type="number" step="0.01" id="vCost" placeholder="Contract total">
        <input type="text" id="vSite" placeholder="Website (optional)">
      </div>
      <button class="action" style="margin-top:12px;" id="addVendorBtn">${ICONS.plus} Add vendor</button>
    </div>
    <div id="vendorList"></div>
  `;

  function draw() {
    const list = getVendors();
    const listEl = el.querySelector("#vendorList");
    if (!list.length) {
      listEl.innerHTML = `<div class="empty-state">No vendors added yet. Start with Venue, Photographer, or Caterer &mdash; they're next up on your checklist.</div>`;
      return;
    }
    listEl.innerHTML = `
      <div class="table-wrap">
        <table>
          <thead><tr><th>Vendor</th><th>Category</th><th>Contact</th><th>Status</th><th>Due</th><th>Total</th><th></th></tr></thead>
          <tbody>
            ${list.map((v, i) => `
              <tr>
                <td>${v.site ? `<a class="item-link" href="${escapeAttr(/^https?:\/\//i.test(v.site) ? v.site : "https://" + v.site)}" target="_blank" rel="noopener">${escapeHtml(v.name)}</a>` : escapeHtml(v.name)}</td>
                <td>${escapeHtml(v.category || "")}</td>
                <td>${autoLinkify(v.contact || "")}</td>
                <td><span class="badge ${v.status === "Booked" || v.status === "Paid in full" ? "ok" : "warn"}">${v.status}</span></td>
                <td>${v.due || ""}</td>
                <td>${v.cost != null ? "$" + Number(v.cost).toFixed(2) : ""}</td>
                <td><button class="icon-btn" data-remove="${i}" aria-label="Remove">${ICONS.trash}</button></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
    listEl.querySelectorAll("[data-remove]").forEach(btn => btn.addEventListener("click", () => {
      const l = getVendors();
      l.splice(Number(btn.dataset.remove), 1);
      saveVendors(l);
      draw();
    }));
  }

  el.querySelector("#addVendorBtn").addEventListener("click", () => {
    const name = el.querySelector("#vName").value.trim();
    if (!name) return;
    const list = getVendors();
    list.push({
      name,
      category: el.querySelector("#vCategory").value.trim(),
      contact: el.querySelector("#vContact").value.trim(),
      status: el.querySelector("#vStatus").value,
      due: el.querySelector("#vDue").value,
      cost: el.querySelector("#vCost").value ? Number(el.querySelector("#vCost").value) : null,
      site: el.querySelector("#vSite").value.trim()
    });
    saveVendors(list);
    ["vName", "vCategory", "vContact", "vDue", "vCost", "vSite"].forEach(id => el.querySelector("#" + id).value = "");
    draw();
  });

  draw();
}
