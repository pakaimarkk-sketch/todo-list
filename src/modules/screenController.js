import {
  createForm,
  createMonthView,
  createWeekView,
  createDayView,
  createProjectView,
} from "../components/createView";

import {
  renderDayTasks,
  renderWeekTasks,
  renderMonthTasks,
} from "./viewRenderers";

import { 
  renderProjectDayTasks,
  renderProjectWeekTasks,
  renderProjectMonthTasks,
 } from "./projects/projectViewRenderer";

import { 
  createNotesView 
} from "./notes/createNotesView";

import { 
  notesState 
} from "./notes/notesStates";

import { 
  openCreateNote, 
  selectNote, 
  handlePrimaryNoteAction,
  deleteCurrentNote,
  searchInNotes
} from "./notes/notesController";

import {
  renderNotesList,
  displaySelectedNote,
  displayEditableNote,
} from "./notes/noteRenderer";

import { getSelectedNote, getVisibleNotes} from "./notes/notes";
import { } from "./projects/projectController";

export const appState = {
  currentView: "day",
  selectedDate: new Date(),
  selectedProject: null,
  projectSubView: "day",
  selectedNote: null,
};



export const toggleTaskForm = (taskList, taskToEdit = null, onDone, defaultDate = null, selectedProject) => {
    const mainContainer = document.getElementById("mainContainer");

    const existingCard = document.getElementById("taskCard");
    if (existingCard) {
        existingCard.remove();
    }

    const card = createForm(taskToEdit, onDone, defaultDate, selectedProject);
    mainContainer.appendChild(card);
};

const helpers = {
  openTaskForm: toggleTaskForm,
  onDayClick: (dateString) => {
    showView("day", new Date(dateString));
  },
};

const views = {
  day: {
    create: () => createDayView(appState.selectedDate),
    bind: () => dayViewBind(),
    render: () => renderDayTasks(appState.selectedDate, helpers),
  },
  week: {
    create: () => createWeekView(appState.selectedDate),
    bind: () => weekViewBind(),
    render: () => renderWeekTasks(appState.selectedDate, helpers),
  },
  month: {
    create: () => createMonthView(appState.selectedDate),
    bind: () => monthViewBind(),
    render: () => renderMonthTasks(appState.selectedDate, helpers),
  },
  project: {
    create: () => 
      createProjectView(
        appState.selectedProject,
        appState.selectedDate,
        appState.projectSubView,
      ),
    bind: () => projectViewBind(),
    render: () => renderProjectView(),
  },
  notes: {
  create: () => createNotesView(),
  bind: () => notesViewBind(),
  render: () => renderNotes(),
  },
};

function refreshNotesList() {
  const visibleNotes = getVisibleNotes(notesState.searchTerm, notesState.sortBy);

  renderNotesList(visibleNotes, (note) => {
    selectNote(note.id);
    updateUI();
  });
}

export function updateUI() {
  const todo = document.getElementById("todo");
  const currentView = views[appState.currentView];

  if (!currentView) return;

  todo.innerHTML = "";
  todo.appendChild(currentView.create());
  currentView.bind();
  currentView.render();
}

export function showView(viewName, date = appState.selectedDate) {
  appState.currentView = viewName;
  appState.selectedDate = new Date(date);
  updateUI();
}

export function setSelectedDate(date, onSelect) {
  appState.selectedDate = new Date(date);
  updateUI();
}

export const sidebarBtns = () => {
  const navbar = document.getElementById("navDay");

  navbar.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (!button) return;

    const viewID = button.id;

    if (viewID === "day") {
      showView("day", new Date());
      return;
    }

    showView(viewID);
  });
};

export function goToNextDay() {
  const next = new Date(appState.selectedDate);
  next.setDate(next.getDate() + 1);
  appState.selectedDate = next;
  updateUI();
}

export function goToPrevDay() {
  const prev = new Date(appState.selectedDate);
  prev.setDate(prev.getDate() - 1);
  appState.selectedDate = prev;
  updateUI();
}

export function goToNextWeek() {
  const next = new Date(appState.selectedDate);
  next.setDate(next.getDate() + 7);
  appState.selectedDate = next;
  updateUI();
}

export function goToPrevWeek() {
  const prev = new Date(appState.selectedDate);
  prev.setDate(prev.getDate() - 7);
  appState.selectedDate = prev;
  updateUI();
}

export function goToNextMonth() {
  const next = new Date(appState.selectedDate);
  next.setMonth(next.getMonth() + 1);
  appState.selectedDate = next;
  updateUI();
}

export function goToPrevMonth() {
  const prev = new Date(appState.selectedDate);
  prev.setMonth(prev.getMonth() - 1);
  appState.selectedDate = prev;
  updateUI();
}

function dayViewBind() {
  const prevBtn = document.getElementById("prevDayBtn");
  const nextBtn = document.getElementById("nextDayBtn");

  if (prevBtn) prevBtn.addEventListener("click", goToPrevDay);
  if (nextBtn) nextBtn.addEventListener("click", goToNextDay);
}

function weekViewBind() {
  const prevBtn = document.getElementById("prevWeekBtn");
  const nextBtn = document.getElementById("nextWeekBtn");

  if (prevBtn) prevBtn.addEventListener("click", goToPrevWeek);
  if (nextBtn) nextBtn.addEventListener("click", goToNextWeek);
}

function monthViewBind() {
  const prevBtn = document.getElementById("prevMonthBtn");
  const nextBtn = document.getElementById("nextMonthBtn");

  if (prevBtn) prevBtn.addEventListener("click", goToPrevMonth);
  if (nextBtn) nextBtn.addEventListener("click", goToNextMonth);
}

function notesViewBind() {
  const addBtn = document.getElementById("addNoteBtn");
  const primaryActionBtn = document.getElementById("primaryActionBtn");
  const searchInput = document.getElementById("noteSearch");
  const sortSelect = document.getElementById("noteSort");
  const deleteBtn = document.getElementById("deleteNoteBtn")

  if (addBtn) {
  addBtn.addEventListener("click", () => {
    openCreateNote();
    updateUI();
  });
  }

  if (primaryActionBtn) {
    primaryActionBtn.addEventListener("click", () => {
      handlePrimaryNoteAction();
      updateUI();
    });
  }

  if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {
      deleteCurrentNote();
      updateUI();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      searchInNotes();
      refreshNotesList();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      notesState.sortBy = sortSelect.value;
      refreshNotesList();
    });
  }
}

function renderNotes() {
  const visibleNotes = getVisibleNotes(notesState.searchTerm, notesState.sortBy);
  const selectedNote = getSelectedNote(notesState.selectedNoteId);
    
    renderNotesList(visibleNotes, (note) => {
      selectNote(note.id);
      updateUI();
    });

    if (notesState.viewerMode === "create") {
      displayEditableNote();
      return;
    }

    if (notesState.viewerMode === "edit") {
      displayEditableNote(selectedNote);
      return;
    }

    if (notesState.viewerMode === "read") {
      displaySelectedNote(selectedNote);
      return;
    }

    displaySelectedNote(null);
}

function renderProjectView() {
  if (appState.projectSubView === "day") {
    renderProjectDayTasks(appState.selectedProject, appState.selectedDate, helpers);
    return;
  }

  if (appState.projectSubView === "week") {
    renderProjectWeekTasks(appState.selectedProject, appState.selectedDate, helpers);
    return;
  }

  if (appState.projectSubView === "month") {
    renderProjectMonthTasks(appState.selectedProject, appState.selectedDate, helpers);
  }
}

export function projectViewBind() {
  const dayBtn = document.getElementById("projectDayBtn");
  const weekBtn = document.getElementById("projectWeekBtn");
  const monthBtn = document.getElementById("projectMonthBtn");

  if (dayBtn) {
    dayBtn.addEventListener("click", () => {
      appState.projectSubView = "day";
      updateUI();
    });
  }

  if (weekBtn) {
    weekBtn.addEventListener("click", () => {
      appState.projectSubView = "week";
      updateUI();
    });
  }

  if (monthBtn) {
    monthBtn.addEventListener("click", () => {
      appState.projectSubView = "month";
      updateUI();
    });
  }
}