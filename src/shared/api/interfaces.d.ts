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
  created: number;
  /** Time. Absolute milliseconds. */
  modified: number;
};
