function renderBudget(el) {
  const budget = getBudget();
  let grandEst = 0, grandAct = 0;
  budget.categories.forEach(c => c.items.forEach(it => {
    grandEst += Number(it.estimated) || 0;
    grandAct += Number(it.actual) || 0;
  }));

  el.innerHTML = `
    <div class="page-head">
      <h1>Budget Tracker</h1>
      <p>Estimated vs. actual, seeded from your planning sheet. Edit actual cost and mark items purchased as you go — changes save automatically in this browser.</p>
    </div>
    <div class="grid grid-3">
      <div class="card"><div class="stat-value">$${grandEst.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div><div class="stat-label">Total estimated</div></div>
      <div class="card"><div class="stat-value">$${grandAct.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div><div class="stat-label">Total actual spend</div></div>
      <div class="card"><div class="stat-value">${budget.categories.reduce((n, c) => n + c.items.length, 0)}</div><div class="stat-label">Line items</div></div>
    </div>
    <div id="budgetCategories"></div>
  `;

  const container = el.querySelector("#budgetCategories");
  container.innerHTML = budget.categories.map((cat, ci) => {
    const catEst = cat.items.reduce((n, it) => n + (Number(it.estimated) || 0), 0);
    const catAct = cat.items.reduce((n, it) => n + (Number(it.actual) || 0), 0);
    return `
    <div class="collapsible" style="margin-top:18px;">
      <div class="collapsible-head section-title" style="margin-bottom:8px;" data-toggle>
        <span>${cat.name} &mdash; est. $${catEst.toLocaleString(undefined, { maximumFractionDigits: 2 })}${catAct ? ` / actual $${catAct.toLocaleString(undefined, { maximumFractionDigits: 2 })}` : ""}</span>
        ${ICONS.chevron}
      </div>
      <div class="collapsible-body table-wrap">
        <table>
          <thead><tr><th>Item</th><th>Estimated</th><th>Actual</th><th>Purchased</th><th>Link</th></tr></thead>
          <tbody>
            ${cat.items.map((it, ii) => `
              <tr>
                <td>${it.link ? `<a class="item-link" href="${escapeAttr(it.link)}" target="_blank" rel="noopener">${escapeHtml(it.item)}</a>` : escapeHtml(it.item)}</td>
                <td>${it.estimated != null ? "$" + Number(it.estimated).toFixed(2) : "<span class=\"badge muted\">TBD</span>"}</td>
                <td><input type="number" step="0.01" placeholder="--" style="width:90px" value="${it.actual != null ? it.actual : ""}" data-ci="${ci}" data-ii="${ii}" data-field="actual"></td>
                <td><input type="checkbox" ${it.purchased ? "checked" : ""} data-ci="${ci}" data-ii="${ii}" data-field="purchased"></td>
                <td class="link-cell">${linkCellHTML(it.link, it.item, `data-ci="${ci}" data-ii="${ii}"`)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
  }).join("");

  container.querySelectorAll("[data-toggle]").forEach(h => h.addEventListener("click", () => toggleCollapsible(h.closest(".collapsible"))));

  container.addEventListener("click", e => {
    const btn = e.target.closest(".link-edit");
    if (!btn) return;
    const ci = Number(btn.dataset.ci), ii = Number(btn.dataset.ii);
    const cur = getBudget().categories[ci].items[ii].link;
    const v = promptForLink(cur);
    if (v === null) return;
    updateBudgetItem(ci, ii, { link: v });
    renderBudget(el);
  });

  container.addEventListener("change", e => {
    const t = e.target;
    if (!t.dataset.field) return;
    const ci = Number(t.dataset.ci), ii = Number(t.dataset.ii);
    const patch = {};
    patch[t.dataset.field] = t.dataset.field === "purchased" ? t.checked : (t.value === "" ? null : Number(t.value));
    updateBudgetItem(ci, ii, patch);
    renderBudget(el);
  });
}
