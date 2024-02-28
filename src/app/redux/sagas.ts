import { all, put, takeEvery } from "redux-saga/effects";
import { SHOW_TASK_UNDO, TASK_REMOVED, UNDO_TASK } from "../../shared/model";

// Show a snackbar to allow removing a task
// Wait for a while and hide it
function* watchTaskRemovedSaga() {
  yield put({ type: SHOW_TASK_UNDO });
}

//
function* watchUndoTaskSaga() {
  yield put({ type: SHOW_TASK_UNDO });
}

export function* rootSaga() {
  yield all([
    takeEvery(TASK_REMOVED, watchTaskRemovedSaga),
    takeEvery(UNDO_TASK, watchUndoTaskSaga),
  ]);
}
