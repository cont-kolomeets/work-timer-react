import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../model/tasksSlice";
import { TaskDialog } from "../TaskDialog/TaskDialog";
import "./TasksToolbar.scss";

export function TasksToolbar() {
  const [addDialogShown, setAddDialogShown] = useState(false);
  const dispatch = useDispatch();

  const addDialog = addDialogShown ? (
    <TaskDialog
      task={null}
      onSave={(task) => {
        dispatch(addTask(task));
      }}
      onClosed={() => {
        setAddDialogShown(false);
      }}
    ></TaskDialog>
  ) : null;

  const _addNewTask = () => {
    setAddDialogShown(true);
  };

  const _createReport = () => {};

  return (
    <div className="wt-flex-row wt-tasks-toolbar wt-pad-block-end-12">
      <button className="wt-round-button" onClick={_addNewTask}>
        Add task
      </button>
      <div className="wt-flex-spacer"></div>
      <button className="wt-round-button" onClick={_createReport}>
        Create report
      </button>
      {addDialog}
    </div>
  );
}
