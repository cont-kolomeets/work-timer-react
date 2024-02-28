import { all, delay, put, takeEvery } from "redux-saga/effects";
import {
  HIDE_TASK_UNDO,
  HIDE_TASK_UNDONE,
  SHOW_TASK_UNDO,
  SHOW_TASK_UNDONE,
  TASK_REMOVED,
  UNDO_TASK,
} from "../../shared/model";

// Show a snackbar to allow removing a task
// Wait for a while and hide it
function* watchTaskRemovedSaga() {
  console.log("watchTaskRemovedSaga");
  yield put({ type: SHOW_TASK_UNDO });
  yield delay(2000);
  yield put({ type: HIDE_TASK_UNDO });
}

//
function* watchUndoTaskSaga() {
  console.log("watchUndoTaskSaga");
  yield put({ type: SHOW_TASK_UNDONE });
  yield delay(2000);
  yield put({ type: HIDE_TASK_UNDONE });
}

export function* rootSaga() {
  yield all([
    takeEvery(TASK_REMOVED, watchTaskRemovedSaga),
    takeEvery(UNDO_TASK, watchUndoTaskSaga),
  ]);
}
