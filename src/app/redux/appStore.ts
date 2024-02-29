import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import { alertModelReducer } from "../../entities/alert";
import { dialogModelReducer } from "../../entities/dialog";
import { gridModelReducer } from "../../widgets/monthPanel";
import { tasksModelReducer } from "../../widgets/tasksPanel";
import { timerModelReducer } from "../../widgets/timerPanel";
import { rootSaga } from "./sagas";

const sagaMiddleware = createSagaMiddleware();

export const appStore = configureStore({
  reducer: {
    timer: timerModelReducer,
    grid: gridModelReducer,
    tasks: tasksModelReducer,
    alert: alertModelReducer,
    dialog: dialogModelReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
