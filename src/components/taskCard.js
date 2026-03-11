import { createEl } from "./calendarView";

const tasks = [];


function createTaskObject(form) {
    const data = new FormData(form);

    return {
        id: crypto.randomUUID(),
        title: data.get("taskTitle")?.trim() ?? "",
        description: data.get("taskDesc")?.trim() ?? "",
        dueDate: data.get("taskDueDate") ?? "",
        project: data.get("taskProject")?.trim() ?? "",
        completed: false,
    };
}

function validateTask(task) {
    const errors = [];

    if (task.title === "") {
        errors.push("Title is required");
    }

    if (task.description.length > 200) {
        errors.push("Description is too long");
    }

    return errors;
}

const task = createTaskObject(form);
const errors = validateTask(task);

function renderTask(task) {
    function renderTask(task) {
    const taskHolder = createEl("div", null, "taskHolder");

    const title = createEl("h3", null, "taskTitle");
    title.textContent = task.title;

    const description = createEl("p", null, "taskDesc");
    description.textContent = task.description;

    const dueDate = createEl("span", null, "taskDate");
    dueDate.textContent = task.dueDate || "No due date";

    taskHolder.append(title, description, dueDate);

    return taskHolder;
}

}