/** 1-based. */
export function getNumDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

/** 1-based. */
export function isWeekend(year: number, month: number, day: number): boolean {
  var d = new Date(year, month, day - 1);
  return d.getDay() === 6 || d.getDay() === 0;
}

/** 1-based. */
export function isHoliday(month: number, day: number): boolean {
  return (month === 2 && day === 23) || (month === 3 && day === 8);
}
