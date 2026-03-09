import { createTodayView } from "../components/calendarView";

const views = {
    'today': createTodayView
};

    
export const updateUI = (viewID) => {
    const todo = document.getElementById("todo");

    if (views[viewID]) {
        todo.innerHTML = "";
        todo.appendChild(views[viewID]());
    }
}
