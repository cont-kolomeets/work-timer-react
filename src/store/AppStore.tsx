import { configureStore } from "@reduxjs/toolkit";
import timerSlice from "../components/TimerPanel/store/timerSlice";
import gridSlice from "../components/MonthPanel/DaysGrid/store/gridSlice";
import tasksSlice from "../components/TasksPanel/store/tasksSlice";
import alertSlice from "../components/shared/Alert/store/alertSlice";

const AppStore = configureStore({
  reducer: {
    timer: timerSlice,
    grid: gridSlice,
    tasks: tasksSlice,
    alert: alertSlice,
  },
});

export default AppStore;
