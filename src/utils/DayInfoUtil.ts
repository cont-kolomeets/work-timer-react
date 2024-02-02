export type DayInfo = {
  elapsed: number;
  points: { start: number; end: number }[];
  firstStart?: number; // obsolete property from the old format
};

/**
 * Ensures `dayInfo` has the correct latest format.
 */
export function toDayInfo(dayInfo: number | DayInfo): DayInfo {
  if (!dayInfo || typeof dayInfo === "number") {
    dayInfo = {
      elapsed: typeof dayInfo === "number" ? dayInfo : 0,
      points: [],
    };
  }

  dayInfo.elapsed = dayInfo.elapsed || 0;
  dayInfo.points = dayInfo.points || [];

  if (dayInfo.firstStart) {
    dayInfo.points.push({
      start: dayInfo.firstStart,
      end: dayInfo.firstStart,
    });
    dayInfo.points.length = 1;
    delete dayInfo.firstStart;
  }

  if (dayInfo.points.length === 1 && !dayInfo.points[0].end) {
    dayInfo.points[0].end = dayInfo.points[0].start;
  }

  return dayInfo;
}
