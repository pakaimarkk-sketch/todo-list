export function formatDateLocal(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseLocalDate(dateString) {
  if (!dateString || typeof dateString !== "string") return null;

  const [year, month, day] = dateString.split("-").map(Number);

  if (!year || !month || !day) return null;

  return new Date(year, month - 1, day);
}

export function getShortDateLabel(date) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[date.getMonth()]} ${date.getDate()}`;
}

export function getStartOfWeek(date) {
  const result = new Date(date);
  const day = result.getDay();
  const diff = day === 0 ? -6 : 1 - day;

  result.setDate(result.getDate() + diff);
  result.setHours(0, 0, 0, 0);

  return result;
}

export function getWeekDates(selectedDate) {
    const start = getStartOfWeek(selectedDate);
    const weekDates = [];

    for (let i = 0; i < 7; i++) {
        const date = new Date(start);
        date.setDate(start.getDate() + i);
        weekDates.push(date);
    }

    return weekDates;
}

export function getEndOfWeek(date) {
  const end = getStartOfWeek(date);
  end.setDate(end.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  return end;
}

export function isSameDay(dateString, selectedDate) {
  const date = parseLocalDate(dateString);
  if (!date) return false;

  return (
    date.getFullYear() === selectedDate.getFullYear() &&
    date.getMonth() === selectedDate.getMonth() &&
    date.getDate() === selectedDate.getDate()
  );
}

export function isSameWeek(dateString, selectedDate) {
  const date = parseLocalDate(dateString);
  if (!date) return false;
  const startOfWeek = getStartOfWeek(selectedDate);
  const endOfWeek = getEndOfWeek(selectedDate);

  return date >= startOfWeek && date <= endOfWeek;
}

export function isSameMonth(dateString, selectedDate) {
  const date = parseLocalDate(dateString);
  if (!date) return false;

  return (
    date.getFullYear() === selectedDate.getFullYear() &&
    date.getMonth() === selectedDate.getMonth()
  );
}

export function getMonthName(date) {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return months[date.getMonth()];
}

export function getMonthGridDays(selectedDate) {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const days = [];

  let startOffset = firstDayOfMonth.getDay();
  startOffset = startOffset === 0 ? 6 : startOffset - 1; // Monday first

  for (let i = 0; i < startOffset; i++) {
    days.push({ type: "empty" });
  }

  for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
    days.push({
      type: "day",
      date: new Date(year, month, day),
    });
  }

  return days;
}

export function getWeekRangeLabel(selectedDate) {
  const weekDates = getWeekDates(selectedDate);
  const first = weekDates[0];
  const last = weekDates[6];

  return `${getShortDateLabel(first)} - ${getShortDateLabel(last)}`;
}
