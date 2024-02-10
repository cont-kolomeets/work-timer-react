import { configureStore } from "@reduxjs/toolkit";
import timerSlice, { TimerState } from "../components/timer/timerSlice";

export type AppState = {
  timer: TimerState;
};

const AppStore = configureStore({
  reducer: {
    timer: timerSlice,
  },
});

export default AppStore;
