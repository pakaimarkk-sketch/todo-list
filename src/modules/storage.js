const TASKS_KEY = "tasks";
const NOTES_KEY = "notes";


export function loadTasks() {
  return JSON.parse(localStorage.getItem(TASKS_KEY)) || [];
}

export function saveTasks(tasks) {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

export function loadNotes() {
  return JSON.parse(localStorage.getItem(NOTES_KEY)) || [];
}

export function saveNotes(notes) {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}