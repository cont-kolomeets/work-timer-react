import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/types";
import { client } from "../../../shared/api";
import { get1BasedDate, simplifyWorkIntervals } from "../../../shared/lib";

type TimerState = {
  year: number;
  month: number;
  day: number;
  running: boolean;
  /** Elapsed time. */
  time: number;
  /** [start, end] */
  workIntervals: number[][];
  loadingStatus: "idle" | "loading";
};

const date = get1BasedDate();
const initialState: TimerState = {
  year: date.y,
  month: date.m,
  day: date.d,
  running: false,
  time: 0,
  workIntervals: [],
  loadingStatus: "idle",
};

const fetchTime = createAsyncThunk("timer/fetchTime", async (_, api) => {
  const state = (api.getState() as RootState).timer;
  const result = await client.getDayData({
    year: state.year,
    month: state.month,
    day: state.day,
  });
  return result;
});

const postTime = createAsyncThunk("timer/postTime", async (_, api) => {
  const state = (api.getState() as RootState).timer;
  await client.updateDay({
    year: state.year,
    month: state.month,
    dayInfo: {
      index: state.day,
      time: state.time,
      workIntervals: state.workIntervals,
    },
  });
});

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setDate: (
      state,
      { payload }: PayloadAction<{ year: number; month: number; day: number }>
    ) => {
      const dayChanged =
        `${state.year}/${state.month}/${state.day}` !==
        `${payload.year}/${payload.month}/${payload.day}`;
      state.year = payload.year;
      state.month = payload.month;
      state.day = payload.day;
      if (dayChanged) {
        // reset state
        state.time = 0;
        state.workIntervals = [];
      }
    },
    toggleTimer: (state) => {
      state.running = !state.running;
    },
    stopTimer: (state) => {
      state.running = false;
    },
    setTime: (state, action: PayloadAction<number>) => {
      state.time = action.payload;
      !state.time && (state.workIntervals = []);
    },
    addInterval: (state, action: PayloadAction<number[]>) => {
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
