function renderInvites(el) {
  el.innerHTML = `
    <div class="page-head">
      <h1>Invitations &amp; Paper Goods</h1>
      <p>Quantities carried over from your Shopping List tab. Track design/print/send status for each piece.</p>
    </div>
    <div class="table-wrap" id="paperTable"></div>
  `;

  function draw() {
    const items = getPaperGoods();
    el.querySelector("#paperTable").innerHTML = `
      <table>
        <thead><tr><th>Item</th><th>Qty</th><th>Status</th><th>Link</th></tr></thead>
        <tbody>
          ${items.map((it, i) => `
            <tr>
              <td>${it.link ? `<a class="item-link" href="${escapeAttr(it.link)}" target="_blank" rel="noopener">${escapeHtml(it.item)}</a>` : escapeHtml(it.item)}</td>
              <td>${it.qty != null ? it.qty : ""}</td>
              <td>
                <select data-index="${i}">
                  <option ${it.status === "Not started" ? "selected" : ""}>Not started</option>
                  <option ${it.status === "Designing" ? "selected" : ""}>Designing</option>
                  <option ${it.status === "Ordered" ? "selected" : ""}>Ordered</option>
                  <option ${it.status === "Sent" ? "selected" : ""}>Sent</option>
                </select>
              </td>
              <td class="link-cell">${linkCellHTML(it.link, it.item + " wedding", `data-index="${i}"`)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
    el.querySelectorAll("#paperTable select").forEach(sel => sel.addEventListener("change", () => {
      updatePaperGood(Number(sel.dataset.index), { status: sel.value });
      draw();
    }));
    el.querySelectorAll("#paperTable .link-edit").forEach(btn => btn.addEventListener("click", () => {
      const i = Number(btn.dataset.index);
      const cur = getPaperGoods()[i].link;
      const v = promptForLink(cur);
      if (v === null) return;
      updatePaperGood(i, { link: v });
      draw();
    }));
  }
  draw();
}
