import { createTodayView } from "../components/calendarView";
import { createCard } from "../components/taskForm";
import { createEl } from "../../../Restaurant-page/src/utils/createUtils";


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
        const addTaskButtons = todo.querySelectorAll(".addTaskBtn");
        addTaskButtons.forEach((button) => {
            button.addEventListener("click", toggleTaskForm);
        });
    }
}


export const toggleTaskForm = () => {
    const mainContainer = document.getElementById("mainContainer");

    const card = createCard();
    mainContainer.appendChild(card);

    const taskCancel = document.getElementById("taskCancel");
    const taskCard = document.getElementById("taskCard")

    taskCancel.addEventListener("click", () => {
        taskCard.remove();
    });
    
};
