/**
 * Total saved state for all years so far.
 */
export type SavedState = {
  years: Record<number, SavedState_Year>;
};

export type SavedState_Year = {
  months: Record<number, SavedState_Month>;
  /** The amount of dept. Milliseconds. */
  dept?: number;
};

export type SavedState_Month = {
  timeNeeded: number;
  days: Record<number, SavedState_Day>;
  tasks: Record<number, SavedState_Task>;
};

export type SavedState_Day = {
  /** Time elapsed for this dayin. Milliseconds. */
  elapsedTime: number;
  /** [start, end]. Absolute milliseconds. */
  workIntervals: number[][];
};

export type SavedState_Task = {
  /** Unique id. */
  id: string;
  issueNumber: number;
  label: string;
  description: string;
  /** Time. Absolute milliseconds. */
  modified: number;
};
