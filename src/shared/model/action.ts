import { createAction } from "@reduxjs/toolkit";
import { SavedState_Task } from "../api";

const TASK_REMOVED = "task-removed";
const UNDO_TASK = "undo-task";

export const taskRemovedAction = createAction<SavedState_Task>(TASK_REMOVED);
export const undoTaskAction = createAction<SavedState_Task>(UNDO_TASK);
