import { configureStore } from "@reduxjs/toolkit";
import { alertModelReducer } from "../entities/alert";
import { gridModelReducer } from "../widgets/monthPanel";
import { tasksModelReducer } from "../widgets/tasksPanel";
import { timerModelReducer } from "../widgets/timerPanel";

export const appStore = configureStore({
  reducer: {
    timer: timerModelReducer,
    grid: gridModelReducer,
    tasks: tasksModelReducer,
    alert: alertModelReducer,
  },
});
