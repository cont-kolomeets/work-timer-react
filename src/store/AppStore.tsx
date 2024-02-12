import { configureStore } from "@reduxjs/toolkit";
import timerSlice, { TimerState } from "../components/timer/timerSlice";
import gridSlice from "../components/month/DaysGrid/gridSlice";

export type AppState = {
  timer: TimerState;
};

const AppStore = configureStore({
  reducer: {
    timer: timerSlice,
    grid: gridSlice,
  },
});

export default AppStore;
