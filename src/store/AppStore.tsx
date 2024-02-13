import { configureStore } from "@reduxjs/toolkit";
import timerSlice from "../components/TimerPanel/store/timerSlice";
import gridSlice from "../components/MonthPanel/DaysGrid/store/gridSlice";
import tasksSlice from "../components/TasksPanel/store/tasksSlice";

const AppStore = configureStore({
  reducer: {
    timer: timerSlice,
    grid: gridSlice,
    tasks: tasksSlice,
  },
});

export default AppStore;
