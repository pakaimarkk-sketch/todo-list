import { createEl } from "./calendarView";

const tasks = [];

export const createCard = () => {

    const taskCard =createEl("div", "taskCard", null)

    const taskForm = createEl("form", "taskForm", null);

    const taskTitleL = createEl("label", "taskTitleL", null);
    taskTitleL.textContent = "Title";

    const taskTitle = createEl("input", "taskTitle", null);
    taskTitle.type = "text";

    const taskDescL = createEl("label", "taskDescL", null);
    taskDescL.textContent = "Description";

    const taskDesc = createEl("input", "taskDesc", null);
    taskDesc.type = "text";

    const taskDueDateL = createEl("label", "taskDueDateL", null);
    taskDueDateL.textContent = "Due Date";

    const taskDueDate = createEl("input", "taskDueDate", null);
    taskDueDate.type = "date";

    const taskRecurring = createEl("input", "taskRecurring", null);
    taskRecurring.type = "checkbox";

    const taskReminder = createEl("input", "taskReminder", null);
    taskReminder.type = "radio";

    const taskProject = createEl("input", "taskProject", null);
    taskProject.type = "text";
    taskProject.placeholder = "Project";

    const taskSave = createEl("button", "taskSave", null);
    taskSave.textContent = "Save";

    const taskCancel = createEl("button", "taskCancel", null);
    taskCancel.textContent = "Cancel";
    taskCancel.type = "button";



    taskCard.append(
        taskForm, taskTitleL, taskTitle, taskDescL, taskDesc,
        taskDueDateL, taskDueDate, taskRecurring, 
        taskReminder, taskProject, taskSave, taskCancel
    );

    return taskCard;
}
