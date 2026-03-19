import { notesState, notesStates } from "./notesStates";
import { createNote, updateNote } from "./notes";

export function openCreateNote() {
  notesState.viewerMode = "create";
  notesState.selectedNoteId = null;
}

export function selectNote(noteId) {
  notesState.viewerMode = "read";
  notesState.selectedNoteId = noteId;
}

export function openEditNote() {
  if (!notesState.selectedNoteId) return;
  notesState.viewerMode = "edit";
}

const currentMode = notesStates[notesState.viewerMode];

export function handlePrimaryNoteAction() {


  if (notesState.viewerMode === "read") {
    openEditNote();
    return;
  } 
  
  if (notesState.viewerMode === "edit") {
    saveEditedNote();
  } 
  
  if (notesState.viewerMode === "create") {
    saveNewNote();
  }
}

export function saveEditedNote() {
  const titleValue = document.querySelector(".note-inline-title").value;
  const contentValue = document.querySelector(".note-inline-content").value;

  updateNote(notesState.selectedNoteId, {
    title: titleValue,
    content: contentValue,
  });

  notesState.viewerMode = "read";

}

export function saveNewNote() {
  const titleValue = document.querySelector(".note-inline-title").value;
  const contentValue = document.querySelector(".note-inline-content").value;

  const newNote = createNote({
    title: titleValue,
    content: contentValue,
  });

  notesState.selectedNoteId = newNote.id;
  notesState.viewerMode = "read";
}