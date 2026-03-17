import { createEl } from "../utils/dom";
import { createTask, fillForm } from "../modules/tasks";
import { 
    formatDateLocal, 
    getWeekDates, 
    getMonthName, 
    getMonthGridDays,
    getWeekRangeLabel
} from "./dateHelper";

export const createForm = (taskList, taskToEdit = null, onDone, defaultDate = null) => {
    const taskCard = createEl("div", "taskCard", null);
    const taskForm = createEl("form", "taskForm", null);

    const taskTitleL = createEl("label", "taskTitleL", null);
    taskTitleL.textContent = "Title";
    taskTitleL.htmlFor = "taskTitle";

    const taskTitle = createEl("input", "taskTitle", null);
    taskTitle.type = "text";
    taskTitle.name = "taskTitle";
    taskTitle.required = true;

    const taskDescL = createEl("label", "taskDescL", null);
    taskDescL.textContent = "Description";
    taskDescL.htmlFor = "taskDesc";

    const taskDesc = createEl("textarea", "taskDesc", null);
    taskDesc.name = "taskDesc";

    const taskPriorityWrapper = createEl("div", "taskPriorityWrapper", null);

    const taskPriorityL = createEl("p", "taskPriorityL", null);
    taskPriorityL.textContent = "Priority";

    const highLabel = createEl("label", null, "priorityLabel");
    const highInput = createEl("input", "h", null);
    highInput.type = "radio";
    highInput.name = "priority";
    highInput.value = "high";

    const highSpan = createEl("span", null, null);
    highSpan.textContent = "H";
    highLabel.append(highInput, highSpan);

    const mediumLabel = createEl("label", null, "priorityLabel");
    const mediumInput = createEl("input", "m", null);
    mediumInput.type = "radio";
    mediumInput.name = "priority";
    mediumInput.value = "medium";
    mediumInput.checked = true;

    const mediumSpan = createEl("span", null, null);
    mediumSpan.textContent = "M";
    mediumLabel.append(mediumInput, mediumSpan);

    const lowLabel = createEl("label", null, "priorityLabel");
    const lowInput = createEl("input", "l", null);
    lowInput.type = "radio";
    lowInput.name = "priority";
    lowInput.value = "low";

    const lowSpan = createEl("span", null, null);
    lowSpan.textContent = "L";
    lowLabel.append(lowInput, lowSpan);

    taskPriorityWrapper.append(
        taskPriorityL,
        lowLabel,
        mediumLabel,
        highLabel
    );

    const taskDueDateL = createEl("label", "taskDueDateL", null);
    taskDueDateL.textContent = "Due Date";
    taskDueDateL.htmlFor = "taskDueDate";

    const taskDueDate = createEl("input", "taskDueDate", null);
    taskDueDate.type = "date";
    taskDueDate.name = "taskDueDate";

    if (defaultDate && !taskToEdit) {
        taskDueDate.value = new Date(defaultDate).toISOString().split("T")[0];
    }

    const taskProjectL = createEl("label", "taskProjectL", null);
    taskProjectL.textContent = "Project";
    taskProjectL.htmlFor = "taskProject";

    const taskProject = createEl("input", "taskProject", null);
    taskProject.type = "text";
    taskProject.name = "taskProject";
    taskProject.placeholder = "Project";

    const formBtns = createEl("div", null, "taskBtns");

    const taskSave = createEl("button", "taskSave", null);
    taskSave.type = "submit";
    taskSave.textContent = "Save";

    const taskCancel = createEl("button", "taskCancel", null);
    taskCancel.type = "button";
    taskCancel.textContent = "Cancel";

    formBtns.append(taskSave, taskCancel);

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
        formBtns
    );

    taskCard.append(taskForm);

    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();

        createTask(
            taskForm,
            taskToEdit?.id ?? null,
            () => {
                taskForm.reset();
                taskCard.remove();
                onDone();
            },
            defaultDate
        );
    });

    taskCancel.addEventListener("click", () => {
        taskCard.remove();
    });

    if (taskToEdit) {
        fillForm(taskForm, taskToEdit);
    }

    return taskCard;
};

export const createDayView = (selectedDate) => {
    const wrapper = createEl("div", "todayWrapper", null);

    const todayHeader = createEl("div", "todayHeader", null);
    wrapper.appendChild(todayHeader);

    const todayAddTask = createEl("button", "dayAddTask", "addTaskBtn");
    todayAddTask.textContent = "Add Task";
    todayAddTask.type = "button"


    const leftControls = createEl("div", null, "date-nav");

    const prevBtn = createEl("button", "prevDayBtn", "navBtn");
    prevBtn.type = "button";
    prevBtn.textContent = "<";

    const nextBtn = createEl("button", "nextDayBtn", "navBtn");
    nextBtn.type = "button";
    nextBtn.textContent = ">";

    const date = createEl("div", "todayDate", null);
    date.textContent = selectedDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    leftControls.append(prevBtn, date, nextBtn);
    todayHeader.append(leftControls, todayAddTask);

    const todoUl = createEl("ul", null, "todoList");
    wrapper.appendChild(todoUl);
    
    return wrapper;
};

export function createWeekView(selectedDate) {
    const wrapper = createEl("div", "weekView", "week-view");

    const weekHeader = createEl("div", "todayHeader", null);
    wrapper.appendChild(weekHeader);

    const leftControls = createEl("div", null, "date-nav");

    const prevBtn = createEl("button", "prevWeekBtn", "navBtn");
    prevBtn.type = "button";
    prevBtn.textContent = "<";

    const nextBtn = createEl("button", "nextWeekBtn", "navBtn");
    nextBtn.type = "button";
    nextBtn.textContent = ">";

    const title = createEl("div", null, "week-title");
    title.textContent = getWeekRangeLabel(selectedDate);

    leftControls.append(prevBtn, title, nextBtn);

    const weekAddTask = createEl("button", "weekAddTask", "addTaskBtn");
    weekAddTask.textContent = "Add Task";
    weekAddTask.type = "button"

    weekHeader.append(leftControls, weekAddTask);

    const grid = createEl("div", null, "week-grid");
    const weekDates = getWeekDates(selectedDate);

    weekDates.forEach((date) => {
        const column = createWeekColumn(date);
        grid.appendChild(column);
    });

    wrapper.appendChild(grid);
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
    const wrapper = createEl("div", "monthView", "month-view");

    const header = createEl("div", null, "month-header");

    const prevBtn = createEl("button", "prevMonthBtn", "navBtn");
    prevBtn.type = "button";
    prevBtn.textContent = "<";

    const title = createEl("div", null, "month-title");
    title.textContent = `${getMonthName(selectedDate)} ${selectedDate.getFullYear()}`;

    const nextBtn = createEl("button", "nextMonthBtn", "navBtn");
    nextBtn.type = "button";
    nextBtn.textContent = ">";

    header.append(prevBtn, title, nextBtn);

    const weekdayRow = createEl("div", null, "month-weekdays");
    const weekdayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    weekdayNames.forEach(name => {
        const weekday = createEl("div", null, "month-weekday");
        weekday.textContent = name;
        weekdayRow.appendChild(weekday);
    });

    const grid = createEl("div", null, "month-grid");
    const monthDays = getMonthGridDays(selectedDate);

    monthDays.forEach(day => {
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
            day.tasks.slice(0, 3).forEach(task => {
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

    wrapper.append(header, weekdayRow, grid);
    return wrapper;
}

export const createProjectView = () => {
    const wrapper = createEl("div", "weekWrapper", null);

    const todayHeader = createEl("div", "todayHeader", null);
    wrapper.appendChild(todayHeader);

    const date = createEl("div", "projectView", null);
    date.textContent = "Project view";
    todayHeader.appendChild(date);

    const todayAddTask = createEl("button", null, "addTaskBtn");
    todayAddTask.textContent = "Add Task";
    todayHeader.appendChild(todayAddTask);

    const todoUl = createEl("ul", null, "todoList");
    wrapper.appendChild(todoUl);
    const todoLi = createEl("li", "todoLi", null);
    todoUl.appendChild(todoLi);

    return wrapper;
}
