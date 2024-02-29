/**
 * Total saved state for all years so far.
 */
export type SavedState = {
  years?: Record<number, SavedState_Year>;
};

export type SavedState_Year = {
  /** Month index (1-based) => Month. */
  months: Record<number, SavedState_Month>;
  /** The amount of dept. Relative milliseconds. */
  dept?: number;
};

export type SavedState_Month = {
  /** Day index (1-based) => Day. */
  days: Record<number, SavedState_Day>;
  /** Task issue number => Task. */
  tasks: Record<string, SavedState_Task>;
};

export type SavedState_Day = {
  /** 1-based. */
  index: number;
  /** Time elapsed for this day. Relative milliseconds. */
  time: number;
  /** [start, end]. Milliseconds, relative to the 0:00 of this day. */
  workIntervals: number[][];
};

export type SavedState_Task = {
  /** Unique id. */
  id: string;
  /** Link to issue in the repo. */
  link: string;
  /** Issue label. */
  label: string;
  /** Time spent on the task. Relative milliseconds. */
  time: number;
  type: "unset" | "task" | "bug";
  /** Time. Absolute milliseconds. */
  modified: number;
};
