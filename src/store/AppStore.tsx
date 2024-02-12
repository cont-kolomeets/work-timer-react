import { configureStore } from "@reduxjs/toolkit";
import timerSlice from "../components/timer/timerSlice";
import gridSlice from "../components/month/DaysGrid/gridSlice";
import tasksSlice from "../components/tasks/tasksSlice";

const AppStore = configureStore({
  reducer: {
    timer: timerSlice,
    grid: gridSlice,
    tasks: tasksSlice,
  },
});

export default AppStore;
