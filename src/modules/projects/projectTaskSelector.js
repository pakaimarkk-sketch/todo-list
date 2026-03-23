import { getTasks } from "../tasks";
import { isSameDay, isSameWeek, isSameMonth } from "../../components/dateHelper";

export function getProjectTasks(projectName) {
  return getTasks().filter(task => task.project === projectName);
}

export function getProjectDayTasks(projectName, selectedDate) {
  return getProjectTasks(projectName).filter(task =>
    isSameDay(task.dueDate, selectedDate)
  );
}

export function getProjectWeekTasks(projectName, selectedDate) {
  return getProjectTasks(projectName).filter(task =>
    isSameWeek(task.dueDate, selectedDate)
  );
}

export function getProjectMonthTasks(projectName, selectedDate) {
  return getProjectTasks(projectName).filter(task =>
    isSameMonth(task.dueDate, selectedDate)
  );
}