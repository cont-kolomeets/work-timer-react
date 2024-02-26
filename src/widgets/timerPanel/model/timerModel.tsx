import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../../shared/api";
import { get1BasedDate } from "../../../shared/lib";

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
  workIntervals: [],
};

const fetchTime = createAsyncThunk("timer/fetchTime", async () => {
  const date = get1BasedDate();
  const result = await client.getDayData({
    year: date.y,
    month: date.m,
    day: date.d,
  });
  return result;
});

const postTime = createAsyncThunk("timer/postTime", async (time: number) => {
  const date = get1BasedDate();
  const result = await client.updateDay({
    year: date.y,
    month: date.m,
    dayInfo: {
      index: date.d,
      time,
    },
  });
  return result;
});

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
  extraReducers: (builder) => {
    // fetchTime
    builder.addCase(fetchTime.fulfilled, (state, action) => {
      state.time = action.payload.time;
      state.workIntervals = action.payload.workIntervals;
    });
    // postTime
    builder.addCase(postTime.fulfilled, (state, action) => {});
  },
  selectors: {
    isRunning: (state) => state.running,
    getTime: (state) => state.time,
    getIntervals: (state) => state.workIntervals,
  },
});

export const timerModel = {
  actions: {
    ...timerSlice.actions,
    fetchTime,
    postTime,
  },
  selectors: timerSlice.selectors,
};

export const timerModelReducer = timerSlice.reducer;