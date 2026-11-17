const form = document.getElementById("note-form");
const titleInput = document.getElementById("note-title");
const contentInput = document.getElementById("note-content");
const saveButton = document.getElementById("save-button");
const cancelButton = document.getElementById("cancel-edit");
const notesGrid = document.getElementById("notes-grid");
const emptyState = document.getElementById("empty-state");
const statusBox = document.getElementById("status");
const searchInput = document.getElementById("search");
const countLabel = document.getElementById("note-count");
const charCount = document.getElementById("char-count");
let editingId = null;
let searchTimer;

function showStatus(message = "") { statusBox.textContent = message; }
async function api(url, options = {}) {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Something went wrong. Please try again.");
  return data;
}
function formatDate(value) {
  return new Date(value).toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
}
function makeElement(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}
function renderNotes(notes) {
  notesGrid.replaceChildren();
  countLabel.textContent = notes.length;
  emptyState.hidden = notes.length !== 0;
  notes.forEach(note => {
    const card = makeElement("article", "note-card");
    const title = makeElement("h3", "", note.title);
    const content = makeElement("p", "", note.content);
    const meta = makeElement("div", "note-meta");
    meta.append(makeElement("span", "", "Updated " + formatDate(note.updated_at)));
    const actions = makeElement("div", "note-actions");
    const edit = makeElement("button", "icon-button", "Edit");
    edit.type = "button";
    edit.addEventListener("click", () => startEdit(note));
    const del = makeElement("button", "icon-button delete", "Delete");
    del.type = "button";
    del.addEventListener("click", () => removeNote(note.id));
    actions.append(edit, del);
    meta.append(actions);
    card.append(title, content, meta);
    notesGrid.append(card);
  });
}
async function loadNotes() {
  try {
    const q = searchInput.value.trim();
    const notes = await api("/api/notes" + (q ? "?q=" + encodeURIComponent(q) : ""));
    renderNotes(notes);
    showStatus("");
  } catch (error) { showStatus(error.message); }
}
function resetForm() {
  editingId = null;
  form.reset();
  charCount.textContent = "0 characters";
  saveButton.innerHTML = 'Save note <span>↗</span>';
  document.getElementById("form-heading").textContent = "What’s on your mind?";
  cancelButton.hidden = true;
}
function startEdit(note) {
  editingId = note.id;
  titleInput.value = note.title;
  contentInput.value = note.content;
  charCount.textContent = note.content.length + " characters";
  saveButton.textContent = "Update note ↗";
  document.getElementById("form-heading").textContent = "Edit your note";
  cancelButton.hidden = false;
  titleInput.focus();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
async function removeNote(id) {
  if (!window.confirm("Delete this note permanently?")) return;
  try { await api("/api/notes/" + id, { method: "DELETE" }); await loadNotes(); showStatus("Note deleted."); }
  catch (error) { showStatus(error.message); }
}
form.addEventListener("submit", async event => {
  event.preventDefault();
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  if (!title || !content) { showStatus("Please enter both a title and note."); return; }
  saveButton.disabled = true;
  try {
    await api(editingId ? "/api/notes/" + editingId : "/api/notes", {
      method: editingId ? "PUT" : "POST",
      body: JSON.stringify({ title, content })
    });
    resetForm();
    await loadNotes();
    showStatus("Note saved successfully.");
  } catch (error) { showStatus(error.message); }
  finally { saveButton.disabled = false; }
});
cancelButton.addEventListener("click", resetForm);
contentInput.addEventListener("input", () => {
  charCount.textContent = contentInput.value.length + " characters";
});
searchInput.addEventListener("input", () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(loadNotes, 250);
});
loadNotes();
