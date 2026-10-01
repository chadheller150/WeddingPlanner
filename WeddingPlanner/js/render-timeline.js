function renderTimeline(el) {
  const checklist = getChecklist();
  const done = checklist.filter(t => t.status === "Done").length;

  el.innerHTML = `
    <div class="page-head">
      <h1>Timeline &amp; Checklist</h1>
      <p>${done}/${checklist.length} checklist tasks done. Status updates save automatically.</p>
    </div>

    <div class="section-title">Checklist</div>
    <div class="table-wrap" id="checklistTable"></div>

    <div class="section-title">Month-by-Month Plan</div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Window</th><th>Focus</th><th>Key Tasks</th><th>Notes</th></tr></thead>
        <tbody>
          ${WEDDING.monthByMonth.map(m => `
            <tr><td>${m.window}</td><td>${m.focus}</td><td>${m.tasks}</td><td>${m.notes}</td></tr>
          `).join("")}
        </tbody>
      </table>
    </div>

    <div class="section-title">Day-Of Timeline</div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Time</th><th>Event</th><th>Location</th><th>Responsible</th><th>Notes</th></tr></thead>
        <tbody>
          ${WEDDING.dayOfTimeline.map(d => `
            <tr><td>${d.time}</td><td>${d.event}</td><td>${d.location}</td><td>${d.responsible}</td><td>${d.notes}</td></tr>
          `).join("")}
        </tbody>
      </table>
    </div>

    <div class="section-title">Packing &amp; Load-In</div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Category</th><th>Item</th><th>Qty</th><th>Who Packs</th><th>Goes To</th><th>Notes</th></tr></thead>
        <tbody>
          ${WEDDING.packing.map(p => `
            <tr><td>${p.category}</td><td>${p.item}</td><td>${p.qty}</td><td>${p.who}</td><td>${p.goesTo}</td><td>${p.notes}</td></tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;

  const checklistTable = el.querySelector("#checklistTable");
  function drawChecklist() {
    const items = getChecklist();
    checklistTable.innerHTML = `
      <table>
        <thead><tr><th>Phase</th><th>Category</th><th>Task</th><th>Details</th><th>Due</th><th>Status</th></tr></thead>
        <tbody>
          ${items.map((t, i) => `
            <tr>
              <td>${t.phase}</td>
              <td>${t.category}</td>
              <td>${t.task}</td>
              <td>${t.details}</td>
              <td>${t.due}</td>
              <td>
                <select data-index="${i}">
                  <option ${t.status === "Not Started" ? "selected" : ""}>Not Started</option>
                  <option ${t.status === "In Progress" ? "selected" : ""}>In Progress</option>
                  <option ${t.status === "Done" ? "selected" : ""}>Done</option>
                </select>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
    checklistTable.querySelectorAll("select").forEach(sel => sel.addEventListener("change", () => {
      updateChecklistItem(Number(sel.dataset.index), { status: sel.value });
      renderTimeline(el);
    }));
  }
  drawChecklist();
}
