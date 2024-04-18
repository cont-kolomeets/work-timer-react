import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { alertModel } from "../../entities/alert/model/alertModel";
import { SavedState_Task, client } from "../../shared/api";
import { taskRemovedAction, undoTaskAction } from "../../shared/model";
import { tasksModel } from "../../widgets/tasksPanel/model/tasksModel";

function* showUndoAlert(task: SavedState_Task) {
  yield put(
    alertModel.actions.showAlert({
      title: "Task removed",
      message: `Task "${task.label}" has been removed.`,
      link: "UNDO",
      linkAction: undoTaskAction(task),
    })
  );
}

function* watchTaskRemovedSaga(action: PayloadAction<SavedState_Task>) {
  yield call(showUndoAlert, action.payload);
}

function* undoTask(task: SavedState_Task) {
  yield call(client.undoRemoveTask, { taskId: task.id });
}

function* watchUndoTaskSaga(action: PayloadAction<SavedState_Task>) {
  yield call(undoTask, action.payload);
  yield put(tasksModel.actions.fetchTasks());
}

export function* rootSaga() {
  yield all([
    takeEvery(taskRemovedAction.type, watchTaskRemovedSaga),
    takeEvery(undoTaskAction.type, watchUndoTaskSaga),
  ]);
}
