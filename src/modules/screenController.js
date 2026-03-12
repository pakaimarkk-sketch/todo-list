import { createTodayView } from "../components/createView";
import { createForm } from "../components/createView";


const views = {
    'today': createTodayView
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
        
        addTaskButtons.forEach((button) => {
            button.addEventListener("click", () => toggleTaskForm(taskList));
        });
    }
}

export const toggleTaskForm = (taskList) => {
    const mainContainer = document.getElementById("mainContainer");

    const existingCard = document.getElementById("taskCard");
    if (existingCard) {
        existingCard.remove();
        return;
    }

    const card = createForm(taskList);
    mainContainer.appendChild(card);
};

export const sidebarBtns = () => {
    const navbar = document.getElementById("navbar")
    
    navbar.addEventListener("click", (e) => {
        if (e.target.tagName === 'BUTTON') {
            const viewID = e.target.id;
            updateUI(viewID)
        }
    });
}
