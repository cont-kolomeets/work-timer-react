import { configureStore } from "@reduxjs/toolkit";
import { alertSliceReducer } from "../entities/alert";
import { gridSliceReducer } from "../widgets/monthPanel";
import { tasksSliceReducer } from "../widgets/tasksPanel";
import { timerSliderReducer } from "../widgets/timerPanel";

export const appStore = configureStore({
  reducer: {
    timer: timerSliderReducer,
    grid: gridSliceReducer,
    tasks: tasksSliceReducer,
    alert: alertSliceReducer,
  },
});
