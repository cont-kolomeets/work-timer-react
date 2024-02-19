import { useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { SavedState_Task } from "../../../shared/model";
import { TaskDialog } from "../ui/TaskDialog/TaskDialog";
import { tasksModel } from "./tasksModel";

export function useTaskDialog({ task }: { task: SavedState_Task | null }) {
  const isAdd = !task;
  const [editDialogShown, setEditDialogShown] = useState(false);
  const dispatch = useAppDispatch();

  const editDialog = editDialogShown ? (
    <TaskDialog
      task={task}
      onSave={(task) => {
        dispatch(
          isAdd
            ? tasksModel.actions.addTask(task)
            : tasksModel.actions.updateTask(task)
        );
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
