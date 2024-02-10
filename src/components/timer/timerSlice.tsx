import { createSlice } from "@reduxjs/toolkit";

export type TimerState = {
  time: number;
};

type TimerAction = {
  payload: number;
};

const initialState: TimerState = { time: 0 };

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setTime: (state, action: TimerAction) => {
      state.time = action.payload;
    },
  },
  selectors: {
    getTime: (state) => state.time,
  },
});

export const { setTime } = timerSlice.actions;
export const { getTime } = timerSlice.selectors;
export default timerSlice.reducer;
