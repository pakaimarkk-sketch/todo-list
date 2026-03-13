import { createEl, createIconButton } from "../utils/dom";
import { createTask } from "../modules/tasks";
import { fillForm } from "../modules/tasks";

export const createForm = (taskList, taskToEdit = null, onDone) => {
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

    const taskDueDateL = createEl("label", "taskDueDateL", null);
    taskDueDateL.textContent = "Due Date";
    taskDueDateL.htmlFor = "taskDueDate";

    const taskDueDate = createEl("input", "taskDueDate", null);
    taskDueDate.type = "date";
    taskDueDate.name = "taskDueDate";

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
        formBtns
    );

    taskCard.append(taskForm);

    taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    createTask(taskForm, taskList, taskToEdit?.id ?? null, () => {
        taskForm.reset();
        taskCard.remove();
        onDone();
    });
    });

    taskCancel.addEventListener("click", () => {
        taskCard.remove();
    });

    if (taskToEdit) {
        fillForm(taskForm, taskToEdit);
    }

    return taskCard;
};

export const createTodayView = () => {
    const wrapper = createEl("div", "todayWrapper", null);

    const todayHeader = createEl("div", "todayHeader", null)
    wrapper.appendChild(todayHeader)

    const todayAddTask = createEl("button", null, "addTaskBtn")
    todayAddTask.textContent = "Add Task"
    todayHeader.appendChild(todayAddTask)

    const date = createEl("div", "todayDate", null)
    date.textContent = "Todays Date"
    todayHeader.appendChild(date)

    const todoUl = createEl("ul", null, "todoList");
    wrapper.appendChild(todoUl);
    const todoLi = createEl("li", "todoLi", null);
    todoUl.appendChild(todoLi);

    return wrapper;
};

export const createThisWeekView = () => {
    const wrapper = createEl("div", "weekWrapper", null);

    const todayHeader = createEl("div", "todayHeader", null)
    wrapper.appendChild(todayHeader)

    const date = createEl("div", "weekView", null)
    date.textContent = "This Week view"
    todayHeader.appendChild(date)

    const todayAddTask = createEl("button", null, "addTaskBtn")
    todayAddTask.textContent = "Add Task"
    todayHeader.appendChild(todayAddTask)

    const todoUl = createEl("ul", null, "todoList");
    wrapper.appendChild(todoUl);
    const todoLi = createEl("li", "todoLi", null);
    todoUl.appendChild(todoLi);

    return wrapper;
};

export const createThisMonthView = () => {
    const wrapper = createEl("div", "weekWrapper", null);

    const todayHeader = createEl("div", "todayHeader", null)
    wrapper.appendChild(todayHeader)

    const date = createEl("div", "monthView", null)
    date.textContent = "This Month view"
    todayHeader.appendChild(date)

    const todayAddTask = createEl("button", null, "addTaskBtn")
    todayAddTask.textContent = "Add Task"
    todayHeader.appendChild(todayAddTask)

    const todoUl = createEl("ul", null, "todoList");
    wrapper.appendChild(todoUl);
    const todoLi = createEl("li", "todoLi", null);
    todoUl.appendChild(todoLi);

    return wrapper;
}

export const projectView = () => {
    const wrapper = createEl("div", "weekWrapper", null);

    const todayHeader = createEl("div", "todayHeader", null)
    wrapper.appendChild(todayHeader)

    const date = createEl("div", "projectView", null)
    date.textContent = "Project view"
    todayHeader.appendChild(date)

    const todayAddTask = createEl("button", null, "addTaskBtn")
    todayAddTask.textContent = "Add Task"
    todayHeader.appendChild(todayAddTask)

    const todoUl = createEl("ul", null, "todoList");
    wrapper.appendChild(todoUl);
    const todoLi = createEl("li", "todoLi", null);
    todoUl.appendChild(todoLi);

    return wrapper;
}