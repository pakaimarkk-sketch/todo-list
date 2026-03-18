import { loadNotes, saveNotes } from "../storage"

// const notes = loadNotes() ?? [];

export function createNoteObject(form) {
  const data = new FormData(form);

  return {
    id: crypto.randomUUID(),
    title: data.get("noteTitle")?.trim() ?? "",
    content: data.get("noteContent")?.trim() ?? "",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

export function createNote(form) {
  const note = createNoteObject(form);


}

export function addNote(note) {
  notes.push(note);
  saveNotes(notes);
}

