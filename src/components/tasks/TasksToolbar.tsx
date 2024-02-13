import "./TasksToolbar.scss";

export default function TasksToolbar() {
  const _addNewTask = () => {};

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
    </div>
  );
}
