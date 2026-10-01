function renderVenue(el) {
  const guests = getGuests();
  const tableNames = [...new Set(guests.map(g => g.table))];
  let layout = getVenueLayout();
  if (!layout) {
    layout = {
      tables: tableNames.map((name, i) => ({
        id: name, x: 60 + (i % 4) * 160, y: 60 + Math.floor(i / 4) * 150
      })),
      decor: []
    };
    saveVenueLayout(layout);
  }
  // Keep table list in sync if guest data changed since last save.
  tableNames.forEach((name, i) => {
    if (!layout.tables.find(t => t.id === name)) {
      layout.tables.push({ id: name, x: 60 + (i % 4) * 160, y: 60 + Math.floor(i / 4) * 150 });
    }
  });

  el.innerHTML = `
    <div class="page-head">
      <h1>Venue &amp; Seating</h1>
      <p>No floor plan uploaded yet, so tables are laid out freely &mdash; drag to arrange once your venue is confirmed. Tables are pre-seeded from your guest list groupings.</p>
    </div>
    <div class="card" style="margin-bottom:14px; display:flex; gap:10px; align-items:center;">
      <button class="action" id="layerSeating">Seating layer</button>
      <button class="action secondary" id="layerDecor">Decor layer</button>
      <span class="spacer"></span>
      <select id="decorPalette" style="display:none;">
        <option value="">Add decor item...</option>
        <option>Ceremony Arch</option>
        <option>Bar</option>
        <option>DJ Booth</option>
        <option>Dance Floor</option>
        <option>Lounge Area</option>
        <option>Cake Table</option>
        <option>Gift Table</option>
        <option>Guest Book Table</option>
      </select>
    </div>
    <div id="venueCanvas" style="position:relative; height:520px; border:1px dashed var(--border); border-radius:var(--radius); background:var(--bg-subtle); overflow:hidden;"></div>
    <div id="venueDetail" style="margin-top:16px;"></div>
  `;

  const canvas = el.querySelector("#venueCanvas");
  const detail = el.querySelector("#venueDetail");
  let mode = "seating";

  function nodeHtml(kind, id, x, y, label, sub) {
    const shape = kind === "table" ? "border-radius:50%;" : "border-radius:8px;";
    const bg = kind === "table" ? "var(--accent-soft)" : "var(--bg-elevated)";
    return `<div class="venue-node" data-kind="${kind}" data-id="${id}" style="position:absolute; left:${x}px; top:${y}px; ${shape} background:${bg}; border:1px solid var(--accent); min-width:120px; padding:10px; cursor:grab; text-align:center; font-size:12.5px; box-shadow:var(--shadow);">
      <div style="font-weight:600;">${label}</div>
      ${sub ? `<div style="color:var(--text-muted); font-size:11px;">${sub}</div>` : ""}
    </div>`;
  }

  function draw() {
    canvas.innerHTML = layout.tables.map(t => {
      const count = guests.filter(g => g.table === t.id).length;
      return nodeHtml("table", t.id, t.x, t.y, t.id.replace(/\s*\(\d+\)$/, ""), `${count} guests`);
    }).join("") + layout.decor.map(d => nodeHtml("decor", d.uid, d.x, d.y, d.type, "")).join("");
    wireDrag();
  }

  function wireDrag() {
    canvas.querySelectorAll(".venue-node").forEach(node => {
      node.addEventListener("pointerdown", e => {
        const startX = e.clientX, startY = e.clientY;
        const origLeft = parseFloat(node.style.left), origTop = parseFloat(node.style.top);
        node.style.cursor = "grabbing";
        let moved = false;
        function onMove(ev) {
          moved = true;
          node.style.left = origLeft + (ev.clientX - startX) + "px";
          node.style.top = origTop + (ev.clientY - startY) + "px";
        }
        function onUp() {
          document.removeEventListener("pointermove", onMove);
          document.removeEventListener("pointerup", onUp);
          node.style.cursor = "grab";
          const rec = node.dataset.kind === "table"
            ? layout.tables.find(t => t.id === node.dataset.id)
            : layout.decor.find(d => d.uid === node.dataset.id);
          if (rec) { rec.x = parseFloat(node.style.left); rec.y = parseFloat(node.style.top); saveVenueLayout(layout); }
          if (!moved) showDetail(node.dataset.kind, node.dataset.id);
        }
        document.addEventListener("pointermove", onMove);
        document.addEventListener("pointerup", onUp);
      });
    });
  }

  function showDetail(kind, id) {
    if (kind === "table") {
      const list = guests.filter(g => g.table === id);
      detail.innerHTML = `<div class="card"><div class="title serif" style="font-size:16px; margin-bottom:8px;">${id}</div>
        ${list.map(g => `<div style="padding:4px 0; border-bottom:1px solid var(--border); font-size:13.5px;">${g.first} ${g.last}</div>`).join("")}
      </div>`;
    } else {
      detail.innerHTML = `<div class="card" style="display:flex; justify-content:space-between; align-items:center;">
        <span>${id.split("__")[0]}</span>
        <button class="icon-btn" id="removeDecor">${ICONS.trash}</button>
      </div>`;
      detail.querySelector("#removeDecor").addEventListener("click", () => {
        layout.decor = layout.decor.filter(d => d.uid !== id);
        saveVenueLayout(layout);
        detail.innerHTML = "";
        draw();
      });
    }
  }

  el.querySelector("#layerSeating").addEventListener("click", () => { mode = "seating"; el.querySelector("#decorPalette").style.display = "none"; });
  el.querySelector("#layerDecor").addEventListener("click", () => { mode = "decor"; el.querySelector("#decorPalette").style.display = "inline-block"; });
  el.querySelector("#decorPalette").addEventListener("change", e => {
    if (!e.target.value) return;
    layout.decor.push({ uid: e.target.value + "__" + Date.now(), type: e.target.value, x: 200, y: 200 });
    saveVenueLayout(layout);
    e.target.value = "";
    draw();
  });

  draw();
}
