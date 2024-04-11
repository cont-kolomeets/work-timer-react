type DateLike = Date | number;

function _toDate(value: DateLike | undefined): Date {
  value = value || Date.now();
  if (value instanceof Date) {
    return value;
  }
  const d = new Date();
  d.setTime(value);
  return d;
}

/** 1-based. */
export function getNumDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

/** 1-based. */
export function isWeekend(year: number, month: number, day: number): boolean {
  var d = new Date(year, month - 1, day);
  return d.getDay() === 6 || d.getDay() === 0;
}

/** 1-based. */
export function isHoliday(month: number, day: number): boolean {
  return (month === 2 && day === 23) || (month === 3 && day === 8);
}

/**
 * @param d If not passed, the current time is used.
 */
export function get1BasedDate(value?: DateLike): {
  y: number;
  m: number;
  d: number;
} {
  const d = _toDate(value);
  return {
    y: d.getFullYear(),
    m: d.getMonth() + 1,
    d: d.getDate(),
  };
}

export function isToday(value: DateLike): boolean {
  if (!value) {
    return false; // do not fallback to today for empty values
  }
  const d = _toDate(value);
  return JSON.stringify(get1BasedDate()) === JSON.stringify(get1BasedDate(d));
}
