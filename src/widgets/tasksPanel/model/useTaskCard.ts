import { useAppDispatch } from "../../../app/redux/hooks";
import { useConfirmationDialog } from "../../../features/timeEditorDialog/model/useConfirmationDialog";
import { SavedState_Task } from "../../../shared/api";
import { TASK_REMOVED } from "../../../shared/model";
import { tasksModel } from "./tasksModel";
import { useTaskDialog } from "./useTaskDialog";

export function useTaskCard(task: SavedState_Task) {
  const dispatch = useAppDispatch();
  const { editTaskDialog, setTaskEditDialogShown } = useTaskDialog({ task });
  const { confirmationDialog, openConfirmationDialog } =
    useConfirmationDialog();

  function editTask(): void {
    setTaskEditDialogShown(true);
  }

  function deleteTask(): void {
    openConfirmationDialog({
      title: "Confirm delete",
      message: "Are you sure you want to delete this task?",
      onYes: () => {
        dispatch(tasksModel.actions.removeTask(task.id));
        dispatch({ type: TASK_REMOVED });
      },
      onNo: () => {},
    });
  }

  return {
    editTask,
    deleteTask,
    editTaskDialog,
    confirmationDialog,
  };
}
