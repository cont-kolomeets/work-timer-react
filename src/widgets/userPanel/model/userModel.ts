import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/types";
import { client } from "../../../shared/api";
import { simplifyWorkIntervals } from "../../../shared/lib";

type UserState = {
  logInState: "logged-in" | "logged-out" | "register";
  loadingStatus: "idle" | "loading";
  fullName: string;
};

const initialState: UserState = {
  logInState: "logged-out",
  loadingStatus: "idle",
  fullName: "",
};

checkSignInState;
getSignedInUser;
signIn;
register;
checkUserNameAvailable;
signOut;

const fetchTime = createAsyncThunk("user/checkToken", async (_, api) => {
  const state = (api.getState() as RootState).user;
  const result = await client.getDayData({
    year: state.year,
    month: state.month,
    day: state.day,
  });
  return result;
});

const postTime = createAsyncThunk("user/postTime", async (_, api) => {
  const state = (api.getState() as RootState).user;
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

const userSlice = createSlice({
  name: "user",
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
    toggleUser: (state) => {
      state.running = !state.running;
    },
    stopUser: (state) => {
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

export const userModel = {
  actions: {
    ...userSlice.actions,
    fetchTime,
    postTime,
  },
  selectors: userSlice.selectors,
};

export const userModelReducer = userSlice.reducer;
