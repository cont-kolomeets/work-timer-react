import { useState } from "react";
import { useAppDispatch } from "../../../app/redux/hooks";
import { SavedState_Task } from "../../../shared/api";
import { TaskDialog } from "../ui/TaskDialog/TaskDialog";
import { tasksModel } from "./tasksModel";

export function useTaskDialog({ task }: { task: SavedState_Task | null }) {
  const [editDialogShown, setEditDialogShown] = useState(false);
  const dispatch = useAppDispatch();

  const editDialog = editDialogShown ? (
    <TaskDialog
      task={task}
      onSave={(task) => {
        dispatch(tasksModel.actions.updateTask(task));
      }}
      onClosed={() => {
        setEditDialogShown(false);
      }}
    ></TaskDialog>
  ) : null;

  return {
    editDialog,
    setEditDialogShown,
  };
}
