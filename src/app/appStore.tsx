import { configureStore } from "@reduxjs/toolkit";
import { alertModel } from "../entities/alert";
import { gridSliceReducer } from "../widgets/monthPanel";
import { tasksModel } from "../widgets/tasksPanel";
import { timerModel } from "../widgets/timerPanel";

export const appStore = configureStore({
  reducer: {
    timer: timerModel.reducer,
    grid: gridSliceReducer,
    tasks: tasksModel.reducer,
    alert: alertModel.reducer,
  },
});
