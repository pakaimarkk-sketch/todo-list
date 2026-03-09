export const createTodayView = () => {
    const wrapper = createEl("div", "todayWrapper", null);

    const todayHeader = createEl("div", "todayHeader", null)
    wrapper.appendChild(todayHeader)

    const addTask = createEl("button", "todayAddTask", null)
    addTask.textContent = "Add Task"
    todayHeader.appendChild(addTask)
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

const createEl = (tag, id, classes) => {
    const el = document.createElement(tag);
    if (id) el.id = id;
    if (classes) el.classList.add(...classes);
    return el;
};