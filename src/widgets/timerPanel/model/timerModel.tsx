import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/types";
import { client } from "../../../shared/api";
import { get1BasedDate, simplifyWorkIntervals } from "../../../shared/lib";

type TimerState = {
  running: boolean;
  /** Elapsed time. */
  time: number;
  /** [start, end] */
  workIntervals: number[][];
  loadingStatus: "idle" | "loading";
};

const initialState: TimerState = {
  running: false,
  time: 0,
  workIntervals: [],
  loadingStatus: "idle",
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

const postTime = createAsyncThunk("timer/postTime", async (_, api) => {
  const date = get1BasedDate();
  const state = (api.getState() as RootState).timer;
  const result = await client.updateDay({
    year: date.y,
    month: date.m,
    dayInfo: {
      index: date.d,
      time: state.time,
      workIntervals: state.workIntervals,
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
    setInterval: (state, action: PayloadAction<number[]>) => {
      state.workIntervals = state.workIntervals || [];
      state.workIntervals.push(action.payload);
      state.workIntervals = simplifyWorkIntervals(state.workIntervals);
    },
  },
  extraReducers: (builder) => {
    // fetchTime
    builder.addCase(fetchTime.pending, (state, action) => {
      state.loadingStatus = "loading";
    });
    builder.addCase(fetchTime.fulfilled, (state, action) => {
      state.time = action.payload.time;
      state.workIntervals = action.payload.workIntervals;
      state.loadingStatus = "idle";
    });
    builder.addCase(fetchTime.rejected, (state, action) => {
      state.loadingStatus = "idle";
    });
  },
  selectors: {
    isRunning: (state) => state.running,
    getTime: (state) => state.time,
    getIntervals: (state) => state.workIntervals,
    getLoadingStatus: (state) => state.loadingStatus,
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
