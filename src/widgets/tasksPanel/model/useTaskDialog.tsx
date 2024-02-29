import { useState } from "react";
import { useAppDispatch } from "../../../app/redux/hooks";
import { SavedState_Task } from "../../../shared/api";
import { TaskDialog } from "../ui/TaskDialog/TaskDialog";
import { tasksModel } from "./tasksModel";

export function useTaskDialog({ task }: { task: SavedState_Task | null }) {
  const [editTaskDialogShown, setTaskEditDialogShown] = useState(false);
  const dispatch = useAppDispatch();

  const editTaskDialog = editTaskDialogShown ? (
    <TaskDialog
      task={task}
      onSave={(task) => {
        dispatch(tasksModel.actions.updateTask(task));
      }}
      onClosed={() => {
        setTaskEditDialogShown(false);
      }}
    ></TaskDialog>
  ) : null;

  return {
    editTaskDialog,
    setTaskEditDialogShown,
  };
}
