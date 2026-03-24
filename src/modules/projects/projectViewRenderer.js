import { getProjectDayTasks, getProjectWeekTasks, getProjectMonthTasks, } from "./projectTaskSelector";
import { renderTasks, removeTask, toggleTask } from "../tasks";
import { createEl, createIconButton } from "../../utils/dom";

export function renderProjectDayTasks(projectName, selectedDate, helpers,) {
  const { openTaskForm } = helpers;

  const todo = document.getElementById("todo");
  const taskList = todo.querySelector(".todoList");
  const addTaskButtons = todo.querySelectorAll(".addTaskBtn");

  if (!taskList) return;

    function rerender() {
        const dayTasks = getProjectDayTasks(projectName, selectedDate);

        renderTasks(
            dayTasks,
            taskList,
            (task) => openTaskForm(taskList, task, rerender, selectedDate, projectName),
            (taskId) => {
            removeTask(taskId);
            rerender();
            },
            (taskId) => {
            toggleTask(taskId);
            rerender();
            }
        );
        }

    addTaskButtons.forEach((button) => {
      button.onclick = () => {
        openTaskForm(taskList, null, rerender, selectedDate, null);
      };
    });

  rerender();
}

export function renderProjectWeekTasks(projectName, selectedDate, helpers) {
  const { openTaskForm } = helpers;

  const todo = document.getElementById("todo");
  const taskList = createEl("div", null, "week-task-list");
  const columns = todo.querySelectorAll(".week-column");
  const addTaskButtons = todo.querySelectorAll(".addTaskBtn");

  if (!columns.length) return;

  function rerender() {
    const weekTasks = getProjectWeekTasks(projectName, selectedDate);
    const columns = todo.querySelectorAll(".week-column");
    const addTaskButtons = todo.querySelectorAll(".addTaskBtn");

    columns.forEach((column) => {
      const taskList = column.querySelector(".week-task-list");
      if (!taskList) return;
      taskList.textContent = "";

      const columnDate = column.dataset.date;
      const dayTasks = weekTasks.filter((task) => task.dueDate === columnDate);

      dayTasks.forEach((task) => {
        const taskCard = createWeekTaskCard(
          task,
          (task) => openTaskForm(taskList, task, rerender, new Date(columnDate), projectName),
          (taskId) => {
            removeTask(taskId);
            rerender();
          },
          (taskId) => {
            toggleTask(taskId);
            rerender();
          }
        );

        taskList.appendChild(taskCard);
      });
    });
  }

  addTaskButtons.forEach((button) => {
    button.onclick = () => {
      openTaskForm(null, null, rerender, selectedDate, null);
    };
  });

  rerender();
}

function createWeekTaskCard(task, onEdit, onDelete, onToggle) {
  const card = createEl("div", null, "week-task-card");

  if (task.completed) {
    card.classList.add("completed");
  }

  if (task.priority === "high") {
    card.classList.add("priority-high");
  } else if (task.priority === "medium") {
    card.classList.add("priority-medium");
  } else {
    card.classList.add("priority-low");
  }

  const header = createEl("div", null, "week-task-header");

  const checkbox = createEl("input", null, "week-task-check");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.addEventListener("change", () => onToggle(task.id));

  const title = createEl("span", null, "week-task-title");
  title.textContent = task.title;

  header.append(checkbox, title);
  card.appendChild(header);

  if (task.description?.trim()) {
    const details = createEl("details", null, "week-task-details");
    const summary = createEl("summary", null, "week-task-summary");
    const desc = createEl("p", null, "week-task-description");

    summary.textContent = "Description";
    desc.textContent = task.description;

    details.append(summary, desc);
    card.appendChild(details);
  }

  const actions = createEl("div", null, "week-task-actions");

  const editBtn = createIconButton(
    "Edit task",
    `
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path d="M4 20h4l10.5-10.5a1.4 1.4 0 0 0 0-2L16.5 5.5a1.4 1.4 0 0 0-2 0L4 16v4z"></path>
    </svg>
    `,
    "iconBtn",
    "editBtn"
  );

  const deleteBtn = createIconButton(
    "Delete task",
    `
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path d="M9 3h6l1 2h4v2H4V5h4l1-2zm1 6h2v8h-2V9zm4 0h2v8h-2V9zM7 9h2v8H7V9z"></path>
    </svg>
    `,
    "iconBtn",
    "deleteBtn"
  );

  editBtn.addEventListener("click", () => onEdit(task));
  deleteBtn.addEventListener("click", () => onDelete(task.id));

  actions.append(editBtn, deleteBtn);
  card.appendChild(actions);

  return card;
}

export function renderProjectMonthTasks(projectName, selectedDate, helpers) {
  const { onDayClick, openTaskForm } = helpers;

  const todo = document.getElementById("todo");
  const monthGrid = todo.querySelector(".month-grid");
  const addTaskBtn = todo.querySelector("#monthAddTask");

  if (!monthGrid) return;

  function paintMonthPreviews() {
    const monthTasks = getProjectMonthTasks(projectName, selectedDate);
    const dayCells = monthGrid.querySelectorAll("[data-date]");

    dayCells.forEach((cell) => {
      const cellDate = cell.dataset.date;
      const preview = cell.querySelector(".month-task-preview");

      if (!preview) return;

      preview.textContent = "";

      const cellTasks = monthTasks.filter((task) => task.dueDate === cellDate);

      cellTasks.slice(0, 3).forEach((task) => {
        const previewItem = createEl("div", null, "month-preview-item");
        previewItem.textContent = task.title;
        preview.appendChild(previewItem);
      });

      if (cellTasks.length > 3) {
        const more = createEl("div", null, "month-preview-more");
        more.textContent = `+${cellTasks.length - 3} more`;
        preview.appendChild(more);
      }
    });
  }

  function rerender() {
    paintMonthPreviews();
  }

  if (addTaskBtn) {
    addTaskBtn.onclick = () => {
      openTaskForm(null, null, rerender, selectedDate, projectName);
    };
  }

  const dayCells = monthGrid.querySelectorAll("[data-date]");
  dayCells.forEach((cell) => {
    cell.addEventListener("click", () => {
      onDayClick(cell.dataset.date);
    });
  });

  rerender();
}