import { createEl, createIconButton } from "../utils/dom";
import { loadTasks, saveTasks } from "./storage";

let tasks = loadTasks();

export function getTasks() {
    return tasks;
}

export const createTaskObject = (form) => {
    const data = new FormData(form);

    return {
        id: crypto.randomUUID(),
        title: data.get("taskTitle")?.trim() ?? "",
        description: data.get("taskDesc")?.trim() ?? "",
        dueDate: data.get("taskDueDate") ?? "",
        project: data.get("taskProject")?.trim() ?? "",
        completed: false,
    };
};

function validateTask(task) {
    const errors = [];

    if (task.title === "") {
        errors.push("Title is required");
    }

    if (task.description.length > 200) {
        errors.push("Description is too long");
    }

    return errors;
};

function addTask(taskData) {
    const newTask = {
        id: crypto.randomUUID(),
        title: taskData.title,
        description: taskData.description,
        dueDate: taskData.dueDate,
        completed: false,
    };

    tasks.push(newTask);
    saveTasks(tasks);
};

export function removeTask(taskId) {
    const index = tasks.findIndex((task) => task.id === taskId);

    if (index !== -1) {
        tasks.splice(index, 1);
        saveTasks(tasks);
    }
};


export function toggleTask(taskId) {
    const task = tasks.find((task) => task.id === taskId);

    if (task) {
        task.completed = !task.completed;
    }
};

function renderTask(task, taskList, onEdit, onDelete, onToggle) {
    const taskHolder = createEl("div", null, "taskHolder");

    const checkbox = createEl("input", null, "checkBox");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", () => {
        toggleTask(task.id);
        onToggle(task.id)
    });

    const title = createEl("p", null, "taskTitle");
    title.textContent = task.title;

    const description = createEl("p", null, "taskDesc");
    description.textContent = task.description || "";

    const dueDate = createEl("p", null, "taskDate");
    dueDate.textContent = task.dueDate || "";

    const actions = createEl("div", null, "taskActions");

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

    editBtn.addEventListener("click", () => {
        onEdit(task)
    });

    deleteBtn.addEventListener("click", () => {
        removeTask(task.id);
        onDelete(task.id)
    });

    if (task.completed) {
        taskHolder.classList.add("completed");
    }

    actions.append(editBtn, deleteBtn);
    taskHolder.append(checkbox, title, description, dueDate, actions);

    return taskHolder;
};

export function fillForm(form, task) {
    form.elements.taskTitle.value = task.title;
    form.elements.taskDesc.value = task.description;
    form.elements.taskDueDate.value = task.dueDate;
    form.elements.taskProject.value = task.project;
};

export function renderTasks(taskList, onEdit, onDelete, onToggle) {
    if (!taskList) return;

    taskList.textContent = "";

    tasks.forEach((task) => {
        taskList.appendChild(renderTask(task, taskList, onEdit, onDelete, onToggle));
    });
};

export function createTask(form, taskList, editingId = null, onDone) {
    const task = createTaskObject(form);
    const errors = validateTask(task);

    if (errors.length > 0) {
        console.log(errors);
        return;
    }

    if (editingId) {
        const existing = tasks.find(t => t.id === editingId);
        if (existing) {
            existing.title = task.title;
            existing.description = task.description;
            existing.dueDate = task.dueDate;
            existing.project = task.project;
            saveTasks(tasks);
        }
    } else {
        addTask(task);
    }

    onDone();
};

