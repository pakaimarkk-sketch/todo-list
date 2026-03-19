import { loadNotes, saveNotes } from "../storage"

export const notes = loadNotes() ?? [];

export function createNoteObject(values) {
  return {
    id: crypto.randomUUID(),
    title: values.title?.trim() ?? "",
    content: values.content?.trim() ?? "",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

export function addNote(note) {
  notes.push(note);
  saveNotes(notes);
}

export function createNote(values) {
  const note = createNoteObject(values);
  addNote(note);
  return note;
}

export function removeNote(noteId) {
  const index = notes.findIndex((note) => note.id === noteId);

  if (index !== -1) {
    notes.splice(index, 1);
    saveNotes(notes);
  }
}

export function updateNote(noteId, updatedValues) {
  const existing = notes.find((note) => note.id === noteId);
  if (!existing) return;

  existing.title = updatedValues.title;
  existing.content = updatedValues.content;
  existing.updatedAt = Date.now()

  saveNotes(notes);
}

