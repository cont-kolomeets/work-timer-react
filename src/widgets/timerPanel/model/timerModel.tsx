import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TimerState = {
  running: boolean;
  /** Elapsed time. */
  time: number;
  /** [start, end] */
  workIntervals: number[][];
};

const initialState: TimerState = {
  running: false,
  time: 0,
  workIntervals: [
    [3600 * 1000 * 8, 3600 * 1000 * 12],
    [3600 * 1000 * 13, 3600 * 1000 * 15],
    [3600 * 1000 * 20, 3600 * 1000 * 23],
  ],
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    toggleTimer: (state) => {
      state.running = !state.running;
    },
    stopTimer: (state) => {
      state.running = false;
    },
    setTime: (state, action: PayloadAction<number>) => {
      state.time = action.payload;
    },
  },
  selectors: {
    isRunning: (state) => state.running,
    getTime: (state) => state.time,
    getIntervals: (state) => state.workIntervals,
  },
});

export const timerModel = {
  reducer: timerSlice.reducer,
  actions: timerSlice.actions,
  selectors: timerSlice.selectors,
};
