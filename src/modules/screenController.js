import { createThisMonthView, createThisWeekView, createTodayView } from "../components/createView";
import { createForm } from "../components/createView";
import { renderTasks, removeTask, toggleTask } from "./tasks";

const views = {
    'today': createTodayView,
    'thisWeek' : createThisWeekView,
    'thisMonth' : createThisMonthView
};
  
export const updateUI = (viewID) => {
    const todo = document.getElementById("todo");

    if (views[viewID]) {
        todo.innerHTML = "";
        todo.appendChild(views[viewID]());
    }
    if (["today"].includes(viewID)) {
        const taskList = todo.querySelector(".todoList");
        const addTaskButtons = todo.querySelectorAll(".addTaskBtn");
        
        function rerender() {
            renderTasks(taskList,
                (task) => toggleTaskForm(taskList, task, rerender),
                (taskId) => { removeTask(taskId); rerender(); },
                (taskId) => { toggleTask(taskId); rerender(); }
            );
        }

        addTaskButtons.forEach((button) => {
            button.addEventListener("click", () => toggleTaskForm(taskList, null, rerender));
        });

        rerender();
    }
}

export const toggleTaskForm = (taskList, taskToEdit = null, onDone) => {
    const mainContainer = document.getElementById("mainContainer");

    const existingCard = document.getElementById("taskCard");
    if (existingCard) {
        existingCard.remove();
    }

    const card = createForm(taskList, taskToEdit, onDone);
    mainContainer.appendChild(card);
};

export const sidebarBtns = () => {
    const navbar = document.getElementById("navDay")
    
    navbar.addEventListener("click", (e) => {
        const button = e.target.closest("button");
        if (!button) return;

        const viewID = button.id;
        updateUI(viewID);
    });
}

