function renderMoodboard(el) {
  el.innerHTML = `
    <div class="page-head">
      <h1>Mood Board</h1>
      <p>Color palette is a placeholder until you've landed on real wedding colors &mdash; swap the swatches any time. Add inspiration images by pasting an image URL.</p>
    </div>

    <div class="section-title">Palette</div>
    <div class="card" style="display:flex; gap:12px; flex-wrap:wrap;" id="paletteRow"></div>

    <div class="section-title">Inspiration</div>
    <div class="card" style="display:flex; gap:10px; margin-bottom:14px;">
      <input type="text" id="imgUrl" placeholder="Paste an image URL..." style="flex:1;">
      <input type="text" id="imgCaption" placeholder="Caption (optional)" style="width:200px;">
      <button class="action" id="addImgBtn">${ICONS.plus} Add</button>
    </div>
    <div class="grid grid-3" id="moodGrid"></div>
  `;

  const palette = STORE.load("palette", ["#A9852F", "#EADFC6", "#2B2B2B", "#FAF7F2", "#3F7D58"]);
  el.querySelector("#paletteRow").innerHTML = palette.map((c, i) => `
    <div style="text-align:center;">
      <input type="color" value="${c}" data-index="${i}" style="width:56px; height:56px; border:none; border-radius:10px; cursor:pointer;">
      <div style="font-size:11px; color:var(--text-muted); margin-top:4px;">${c}</div>
    </div>
  `).join("");
  el.querySelector("#paletteRow").addEventListener("input", e => {
    const i = Number(e.target.dataset.index);
    palette[i] = e.target.value;
    STORE.save("palette", palette);
    renderMoodboard(el);
  });

  function drawGrid() {
    const items = getMoodboard();
    const grid = el.querySelector("#moodGrid");
    if (!items.length) {
      grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1;">No inspiration images yet &mdash; paste a URL above to start the board.</div>`;
      return;
    }
    grid.innerHTML = items.map((it, i) => `
      <div class="card" style="padding:0; overflow:hidden;">
        <img src="${it.url}" style="width:100%; height:160px; object-fit:cover; display:block;" onerror="this.style.display='none'">
        <div style="padding:10px; display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:13px;">${it.caption || ""}</span>
          <button class="icon-btn" data-remove="${i}" aria-label="Remove">${ICONS.trash}</button>
        </div>
      </div>
    `).join("");
    grid.querySelectorAll("[data-remove]").forEach(btn => btn.addEventListener("click", () => {
      const list = getMoodboard();
      list.splice(Number(btn.dataset.remove), 1);
      saveMoodboard(list);
      drawGrid();
    }));
  }

  el.querySelector("#addImgBtn").addEventListener("click", () => {
    const url = el.querySelector("#imgUrl").value.trim();
    if (!url) return;
    const list = getMoodboard();
    list.push({ url, caption: el.querySelector("#imgCaption").value.trim() });
    saveMoodboard(list);
    el.querySelector("#imgUrl").value = "";
    el.querySelector("#imgCaption").value = "";
    drawGrid();
  });

  drawGrid();
}
