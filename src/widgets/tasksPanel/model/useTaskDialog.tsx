import { useState } from "react";
import { useDispatch } from "react-redux";
import { SavedState_Task } from "../../../shared/model";
import { TaskDialog } from "../ui/TaskDialog/TaskDialog";
import { addTask, updateTask } from "./tasksSlice";

export function useTaskDialog({ task }: { task: SavedState_Task | null }) {
  const isAdd = !task;
  const [editDialogShown, setEditDialogShown] = useState(false);
  const dispatch = useDispatch();

  const editDialog = editDialogShown ? (
    <TaskDialog
      task={task}
      onSave={(task) => {
        dispatch(isAdd ? addTask(task) : updateTask(task));
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
