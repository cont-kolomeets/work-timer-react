import { useState } from "react";
import "./TasksToolbar.scss";
import TaskDialog from "./TaskDialog/TaskDialog";

export default function TasksToolbar() {
  const [addDialogShown, setAddDialogShown] = useState(false);

  const addDialog = addDialogShown ? (
    <TaskDialog
      onClose={() => {
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
