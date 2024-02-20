/**
 * Total saved state for all years so far.
 */
export type SavedState = {
  years: Record<number, SavedState_Year>;
};

export type SavedState_Year = {
  /** Month index (1-based) => Month. */
  months: Record<number, SavedState_Month>;
  /** The amount of dept. Milliseconds. */
  dept?: number;
};

export type SavedState_Month = {
  /** Day index (1-based) => Day. */
  days: Record<number, SavedState_Day>;
  /** Task issue number => Task. */
  tasks: Record<number, SavedState_Task>;
};

export type SavedState_Day = {
  /** 1-based. */
  index: number;
  /** Time elapsed for this day. Milliseconds. */
  time: number;
  /** [start, end]. Absolute milliseconds. */
  workIntervals: number[][];
};

export type SavedState_Task = {
  /** Issue number. */
  issue: number;
  /** Issue label. */
  label: string;
  /** Time. Absolute milliseconds. */
  modified: number;
};
