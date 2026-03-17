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

const appState = {
  currentView: "day",
  selectedDate: new Date(),
  selectedProject: null,
};

export const toggleTaskForm = (taskList, taskToEdit = null, onDone, defaultDate = null) => {
    const mainContainer = document.getElementById("mainContainer");

    const existingCard = document.getElementById("taskCard");
    if (existingCard) {
        existingCard.remove();
    }

    const card = createForm(taskList, taskToEdit, onDone, defaultDate);
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
    bind: () => {
      const prevBtn = document.getElementById("prevDayBtn");
      const nextBtn = document.getElementById("nextDayBtn");

      if (prevBtn) prevBtn.addEventListener("click", goToPrevDay);
      if (nextBtn) nextBtn.addEventListener("click", goToNextDay);
    },
    render: () => renderDayTasks(appState.selectedDate, helpers),
  },
  week: {
    create: () => createWeekView(appState.selectedDate),
    bind: () => {
      const prevBtn = document.getElementById("prevWeekBtn");
      const nextBtn = document.getElementById("nextWeekBtn");

      if (prevBtn) prevBtn.addEventListener("click", goToPrevWeek);
      if (nextBtn) nextBtn.addEventListener("click", goToNextWeek);
    },
    render: () => renderWeekTasks(appState.selectedDate, helpers),
  },
  month: {
    create: () => createMonthView(appState.selectedDate),
    bind: () => {
      const prevBtn = document.getElementById("prevMonthBtn");
      const nextBtn = document.getElementById("nextMonthBtn");

      if (prevBtn) prevBtn.addEventListener("click", goToPrevMonth);
      if (nextBtn) nextBtn.addEventListener("click", goToNextMonth);
    },
    render: () => renderMonthTasks(appState.selectedDate, helpers),
  },
  project: {
    create: () => createProjectView(appState.selectedProject),
    render: () => {},
    bind: () => {},
  },
};


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

export function setSelectedDate(date) {
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

