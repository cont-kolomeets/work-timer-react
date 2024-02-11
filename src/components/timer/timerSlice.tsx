import { createSlice } from "@reduxjs/toolkit";

export type TimerState = {
  running: boolean;
  /** Elapsed time. */
  time: number;
  /** [start, end] */
  workIntervals: number[][];
};

type TimerAction = {
  payload: number;
};

const initialState: TimerState = {
  running: false,
  time: 0,
  workIntervals: [
    [3600 * 1000 * 10, 3600 * 1000 * 12],
    [3600 * 1000 * 13, 3600 * 1000 * 15],
    [3600 * 1000 * 21, 3600 * 1000 * 23],
  ],
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    toggleTimer: (state) => {
      state.running = !state.running;
    },
    setTime: (state, action: TimerAction) => {
      state.time = action.payload;
    },
  },
  selectors: {
    isRunning: (state) => state.running,
    getTime: (state) => state.time,
    getIntervals: (state) => state.workIntervals,
  },
});

export const { toggleTimer, setTime } = timerSlice.actions;
export const { isRunning, getTime, getIntervals } = timerSlice.selectors;
export default timerSlice.reducer;
