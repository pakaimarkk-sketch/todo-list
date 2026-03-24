import { createEl, updatePriorityDisplay } from "../utils/dom";
import { createTask, fillForm } from "../modules/tasks";
import { getProjects } from "../modules/projects/projects";
import { 
    formatDateLocal, 
    getWeekDates, 
    getMonthName, 
    getMonthGridDays,
    getWeekRangeLabel
} from "./dateHelper";

 export const createForm = (
  taskToEdit = null,
  onDone,
  defaultDate = null,
  selectedProject = null
) => {
  const overlay = createEl("div", "taskModalOverlay", "modal-overlay");
  const modal = createEl("div", "taskModal", "modal");

  const title = createEl("h2", null, "modal-title");
  title.textContent = taskToEdit ? "Edit Task" : "Create Task";

  const taskForm = createEl("form", "taskForm", "task-form");

  const taskTitleL = createEl("label", null, "project-label");
  taskTitleL.textContent = "Title";
  taskTitleL.htmlFor = "taskTitle";

  const taskTitle = createEl("input", "taskTitle", "project-input");
  taskTitle.type = "text";
  taskTitle.name = "taskTitle";
  taskTitle.required = true;
  taskTitle.placeholder = "Enter task title";

  const taskDescL = createEl("label", null, "project-label");
  taskDescL.textContent = "Description";
  taskDescL.htmlFor = "taskDesc";

  const taskDesc = createEl("textarea", "taskDesc", "project-textarea");
  taskDesc.name = "taskDesc";
  taskDesc.placeholder = "Optional description";

  const taskDueDateL = createEl("label", null, "project-label");
  taskDueDateL.textContent = "Due Date";
  taskDueDateL.htmlFor = "taskDueDate";

  const taskDueDate = createEl("input", "taskDueDate", "project-input");
  taskDueDate.type = "date";
  taskDueDate.name = "taskDueDate";

  if (defaultDate && !taskToEdit) {
    taskDueDate.value =
      typeof defaultDate === "string" ? defaultDate : formatDateLocal(defaultDate);
  }

  const taskProjectL = createEl("label", null, "project-label");
  taskProjectL.textContent = "Project";
  taskProjectL.htmlFor = "taskProject";

  const taskProject = createEl("select", "taskProject", "project-input");
  taskProject.name = "taskProject";

  const defaultOption = createEl("option");
  defaultOption.value = "";
  defaultOption.textContent = "No project selected";
  taskProject.appendChild(defaultOption);

  const projects = getProjects();

  projects.forEach((project) => {
    const option = createEl("option");
    option.value = project.name;
    option.textContent = project.name;
    taskProject.appendChild(option);
  });

const taskPriorityWrapper = createEl("div", null, "task-priority-group");

const taskPriorityL = createEl("p", null, "project-label");

function updatePriorityDisplay(value) {
  const labels = {
    low: "Priority: Low",
    medium: "Priority: Medium",
    high: "Priority: High",
  };

  taskPriorityL.textContent = labels[value] || "Priority: Medium";
}

const priorityOptions = createEl("div", null, "task-priority-options");

const highLabel = createEl("label", null, "priorityLabel");
const highInput = createEl("input", "h", null);
highInput.type = "radio";
highInput.name = "priority";
highInput.value = "high";

const highSpan = createEl("span");
highSpan.textContent = "H";
highLabel.append(highInput, highSpan);

const mediumLabel = createEl("label", null, "priorityLabel");
const mediumInput = createEl("input", "m", null);
mediumInput.type = "radio";
mediumInput.name = "priority";
mediumInput.value = "medium";
mediumInput.checked = true;

const mediumSpan = createEl("span");
mediumSpan.textContent = "M";
mediumLabel.append(mediumInput, mediumSpan);

const lowLabel = createEl("label", null, "priorityLabel");
const lowInput = createEl("input", "l", null);
lowInput.type = "radio";
lowInput.name = "priority";
lowInput.value = "low";

const lowSpan = createEl("span");
lowSpan.textContent = "L";
lowLabel.append(lowInput, lowSpan);

[lowInput, mediumInput, highInput].forEach((input) => {
  input.addEventListener("change", () => {
    updatePriorityDisplay(input.value);
  });
});

updatePriorityDisplay("medium");

priorityOptions.append(lowLabel, mediumLabel, highLabel);
taskPriorityWrapper.append(taskPriorityL, priorityOptions);

  const errorText = createEl("p", null, "project-form-error");

  const formBtns = createEl("div", null, "modal-actions");

  const taskCancel = createEl("button", null, "modal-cancel-btn");
  taskCancel.type = "button";
  taskCancel.textContent = "Cancel";

  const taskSave = createEl("button", null, "modal-submit-btn");
  taskSave.type = "submit";
  taskSave.textContent = taskToEdit ? "Save" : "Create";

  formBtns.append(taskCancel, taskSave);

  taskForm.append(
    taskTitleL,
    taskTitle,
    taskDescL,
    taskDesc,
    taskDueDateL,
    taskDueDate,
    taskProjectL,
    taskProject,
    taskPriorityWrapper,
    errorText,
    formBtns
  );

  modal.append(title, taskForm);
  overlay.append(modal);

  if (taskToEdit?.project) {
    taskProject.value = taskToEdit.project;
  } else if (selectedProject) {
    taskProject.value = selectedProject;
  }

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    createTask(
      taskForm,
      taskToEdit?.id ?? null,
      (result) => {
        if (result?.error) {
          errorText.textContent = result.error;
          return;
        }

        taskForm.reset();
        overlay.remove();
        onDone?.();
      },
      defaultDate
    );
  });

  taskCancel.addEventListener("click", () => {
    overlay.remove();
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.remove();
    }
  });

  if (taskToEdit) {
    fillForm(taskForm, taskToEdit);
  }

  queueMicrotask(() => taskTitle.focus());

  return overlay;
};

export const createDayView = (selectedDate) => {
  const wrapper = createEl("div", "todayWrapper", "view-shell");

  const header = createEl("div", null, "view-header");
  const left = createEl("div", null, "view-header-left");
  const center = createEl("div", null, "view-header-center");
  const right = createEl("div", null, "view-header-right");

  const addTaskBtn = createEl("button", "dayAddTask", "btn", "btn-primary", "addTaskBtn");
  addTaskBtn.type = "button";
  addTaskBtn.textContent = "Add Task";

  const prevBtn = createEl("button", "prevDayBtn", "btn", "btn-secondary", "btn-icon");
  prevBtn.type = "button";
  prevBtn.textContent = "<";

  const nextBtn = createEl("button", "nextDayBtn", "btn", "btn-secondary", "btn-icon");
  nextBtn.type = "button";
  nextBtn.textContent = ">";

  const title = createEl("h2", "todayDate", "view-title");
  title.textContent = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  left.append(addTaskBtn);
  center.append(prevBtn, title, nextBtn);
  header.append(left, center, right);

  const body = createEl("div", null, "view-body");
  const todoUl = createEl("ul", null, "todoList");
  body.appendChild(todoUl);

  wrapper.append(header, body);
  return wrapper;
};

export function createWeekView(selectedDate) {
  const wrapper = createEl("div", "weekView", "view-shell");

  const header = createEl("div", null, "view-header");
  const left = createEl("div", null, "view-header-left");
  const center = createEl("div", null, "view-header-center");
  const right = createEl("div", null, "view-header-right");

  const addTaskBtn = createEl("button", "weekAddTask", "btn", "btn-primary", "addTaskBtn");
  addTaskBtn.type = "button";
  addTaskBtn.textContent = "Add Task";

  const prevBtn = createEl("button", "prevWeekBtn", "btn", "btn-secondary", "btn-icon");
  prevBtn.type = "button";
  prevBtn.textContent = "<";

  const nextBtn = createEl("button", "nextWeekBtn", "btn", "btn-secondary", "btn-icon");
  nextBtn.type = "button";
  nextBtn.textContent = ">";

  const title = createEl("h2", null, "view-title");
  title.textContent = getWeekRangeLabel(selectedDate);

  left.append(addTaskBtn);
  center.append(prevBtn, title, nextBtn);
  header.append(left, center, right);

  const body = createEl("div", null, "view-body");
  const grid = createEl("div", null, "week-grid");

  const weekDates = getWeekDates(selectedDate);
  weekDates.forEach((date) => {
    const column = createWeekColumn(date);
    grid.appendChild(column);
  });

  body.appendChild(grid);
  wrapper.append(header, body);

  return wrapper;
}

function createWeekColumn(date) {
  const column = createEl("div", null, "week-column");
  column.dataset.date = formatDateLocal(date);

  const header = createEl("div", null, "week-column-header");
  const dayName = createEl("div", null, "week-day-name");
  const dateLabel = createEl("div", null, "week-date-label");
  const taskList = createEl("div", null, "week-task-list");

  dayName.textContent = date.toLocaleDateString("en-US", { weekday: "short" });
  dateLabel.textContent = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });

  header.append(dayName, dateLabel);
  column.append(header, taskList);

  return column;
}
export function createMonthView(selectedDate) {
  const wrapper = createEl("div", "monthView", "view-shell");

  const header = createEl("div", null, "view-header");
  const left = createEl("div", null, "view-header-left");
  const center = createEl("div", null, "view-header-center");
  const right = createEl("div", null, "view-header-right");

  const addTaskBtn = createEl("button", "monthAddTask", "btn", "btn-primary", "addTaskBtn");
  addTaskBtn.type = "button";
  addTaskBtn.textContent = "Add Task";

  const prevBtn = createEl("button", "prevMonthBtn", "btn", "btn-secondary", "btn-icon");
  prevBtn.type = "button";
  prevBtn.textContent = "<";

  const nextBtn = createEl("button", "nextMonthBtn", "btn", "btn-secondary", "btn-icon");
  nextBtn.type = "button";
  nextBtn.textContent = ">";

  const title = createEl("h2", null, "view-title");
  title.textContent = `${getMonthName(selectedDate)} ${selectedDate.getFullYear()}`;

  left.append(addTaskBtn);
  center.append(prevBtn, title, nextBtn);
  header.append(left, center, right);

  const body = createEl("div", null, "view-body");

  const weekdayRow = createEl("div", null, "month-weekdays");
  const weekdayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  weekdayNames.forEach((name) => {
    const weekday = createEl("div", null, "month-weekday");
    weekday.textContent = name;
    weekdayRow.appendChild(weekday);
  });

  const grid = createEl("div", null, "month-grid");
  const monthDays = getMonthGridDays(selectedDate);

  monthDays.forEach((day) => {
    if (day.type === "empty") {
      const emptyCell = createEl("div", null, "month-cell", "empty-cell");
      grid.appendChild(emptyCell);
      return;
    }

    const cell = createEl("button", null, "month-cell", "month-day-cell");
    cell.type = "button";
    cell.dataset.date = formatDateLocal(day.date);

    const top = createEl("div", null, "month-cell-top");
    const dayNumber = createEl("span", null, "month-day-number");
    dayNumber.textContent = String(day.date.getDate());

    const preview = createEl("div", null, "month-task-preview");

    if (day.tasks?.length) {
      day.tasks.slice(0, 3).forEach((task) => {
        const previewItem = createEl("div", null, "month-preview-item");
        previewItem.textContent = task.title;
        preview.appendChild(previewItem);
      });

      if (day.tasks.length > 3) {
        const more = createEl("div", null, "month-preview-more");
        more.textContent = `+${day.tasks.length - 3} more`;
        preview.appendChild(more);
      }
    }

    top.appendChild(dayNumber);
    cell.append(top, preview);
    grid.appendChild(cell);
  });

  body.append(weekdayRow, grid);
  wrapper.append(header, body);

  return wrapper;
}

export function createProjectView(projectName, selectedDate, projectSubView) {
  const wrapper = createEl("div", "projectWrapper", "view-shell");

  const header = createEl("div", null, "view-header");
  const left = createEl("div", null, "view-header-left");
  const right = createEl("div", null, "view-header-right");

  const title = createEl("h2", null, "view-title");
  title.textContent = projectName ? `Project: ${projectName}` : "Project: Untitled";

  const nav = createEl("div", null, "project-subnav");

  const dayBtn = createEl("button", "projectDayBtn", "btn", "btn-secondary");
  dayBtn.textContent = "Day";

  const weekBtn = createEl("button", "projectWeekBtn", "btn", "btn-secondary");
  weekBtn.textContent = "Week";

  const monthBtn = createEl("button", "projectMonthBtn", "btn", "btn-secondary");
  monthBtn.textContent = "Month";

  nav.append(dayBtn, weekBtn, monthBtn);
  left.append(title);
  right.append(nav);
  header.append(left, right);

  const body = createEl("div", "projectContent", "view-body");

  let reusedView;

  if (projectSubView === "day") {
    reusedView = createDayView(selectedDate);
  } else if (projectSubView === "week") {
    reusedView = createWeekView(selectedDate);
  } else {
    reusedView = createMonthView(selectedDate);
  }

  body.appendChild(reusedView);
  wrapper.append(header, body);

  return wrapper;
}