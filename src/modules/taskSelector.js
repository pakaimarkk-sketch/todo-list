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

export function getVisibleTasks() {
  const tasks = getTasks();

  if (!appState.selectedProject) return tasks;

  return tasks.filter(task => task.project === appState.selectedProject);
}

export function getVisibleDayTasks() {
  const tasks = getVisibleTasks();
  return tasks.filter(task => isToday(task.dueDate));
}

export function getVisibleWeekTasks() {
  const tasks = getVisibleTasks();
  return tasks.filter(task => isSameWeek(task.dueDate));
}

export function getVisibleMonthTasks() {
  const tasks = getVisibleTasks();
  return tasks.filter(task => isSameMonth(task.dueDate));
}