import { createEl } from "../../utils/dom";

export function displaySelectedNote(note) {
  const titleEl = document.getElementById("selectedNoteTitle");
  const metaEl = document.getElementById("selectedNoteMeta");
  const contentEl = document.getElementById("selectedNoteContent");

  if (!note) {
    titleEl.textContent = "Select a note";
    metaEl.textContent = "No note selected";
    contentEl.textContent = "Choose a note from the left side.";
    return;
  }

  titleEl.textContent = note.title || "Untitled";
  metaEl.textContent = `Last updated: ${new Date(note.updatedAt).toLocaleString()}`;
  contentEl.textContent = note.content || "Empty note";
}

export function displayEditableNote(note = null) {
  const titleEl = document.getElementById("selectedNoteTitle");
  const metaEl = document.getElementById("selectedNoteMeta");
  const contentEl = document.getElementById("selectedNoteContent");
  const primaryActionBtn = document.getElementById("primaryActionBtn");

  titleEl.textContent = "";
  contentEl.textContent = "";
  primaryActionBtn.textContent = "Save";

  const titleInput = createEl("input", "noteTitleInput", "note-inline-title");
  titleInput.type = "text";
  titleInput.name = "noteTitle";
  titleInput.placeholder = "New Note";
  titleInput.value = note?.title ?? "";


  const contentInput = createEl("textarea", "noteContentInput", "note-inline-content");
  contentInput.name = "noteContent";
  contentInput.placeholder = "Write your note...";
  contentInput.value = note?.content ?? "";

  metaEl.textContent = note
    ? `Last updated: ${new Date(note.updatedAt).toLocaleString()}`
    : "Unsaved note";

  titleEl.appendChild(titleInput);
  contentEl.appendChild(contentInput);
}


export function renderNoteCard(note, onSelect) {
  const card = createEl("button", null, "note-card");
  card.type = "button";

  const title = createEl("h3");
  title.textContent = note.title || "Untitled";

  const preview = createEl("p");
  preview.textContent = note.content.slice(0, 30) + "...." || "Empty note";

  const meta = createEl("p", null, "note-card-meta");
  meta.textContent = new Date(note.updatedAt).toLocaleString();

  card.append(title, preview, meta);
  card.addEventListener("click", () => onSelect(note));

  return card;
}

export function renderNotesList(notes, onSelect) {
  const notesList = document.getElementById("notesList");
  notesList.textContent = "";

  notes.forEach((note) => {
    notesList.appendChild(renderNoteCard(note, onSelect));
  });
}

export function handleSelect(note) {
  displaySelectedNote(note);
}

