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

    const todoUl = createEl("ul", "todoList", null);
    wrapper.appendChild(todoUl);
    const todoLi = createEl("li", "todoLi", null);
    todoLi.textContent = "Clean the Kitchen";
    todoUl.appendChild(todoLi);

    return wrapper;
}

export const createEl = (tag, id, ...classes) => {
    const el = document.createElement(tag);
    if (id) el.id = id;
    if (classes) el.classList.add(...classes);
    return el;
};
