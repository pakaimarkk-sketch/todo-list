import { getTasks } from "./tasks";
import { 
    isSameDay, 
    isSameWeek, 
    isSameMonth 
} from "../components/dateHelper";


export function getDayTasks(selectedDate) {
  const tasks = getTasks();
  return tasks.filter((task) => isSameDay(task.dueDate, selectedDate));
}

export function getWeekTasks(selectedDate) {
  const tasks = getTasks();
  return tasks.filter((task) => isSameWeek(task.dueDate, selectedDate));
}

export function getMonthTasks(selectedDate) {
  const tasks = getTasks();
  return tasks.filter((task) => isSameMonth(task.dueDate, selectedDate));
}

export function getProjectTasks(projectName) {
  const tasks = getTasks();
  return tasks.filter((task) => task.project === projectName);
}




