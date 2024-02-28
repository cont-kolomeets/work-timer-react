import { useState } from "react";
import { useAppSelector } from "../../../../app/redux/hooks";
import { client } from "../../../../shared/api";
import { formatDate, get1BasedDate } from "../../../../shared/lib";
import { Button } from "../../../../shared/ui";
import { downloadFile } from "../../lib/fileUtil";
import { tasksModel } from "../../model/tasksModel";
import { useTaskDialog } from "../../model/useTaskDialog";
import "./TasksToolbar.scss";

export function TasksToolbar() {
  const tasks = useAppSelector(tasksModel.selectors.selectAllTasks);
  const { editDialog, setEditDialogShown } = useTaskDialog({ task: null });
  const [loading, setLoading] = useState(false);

  const _addNewTask = () => {
    setEditDialogShown(true);
  };

  const _createReport = async () => {
    setLoading(true);
    const report = await client.createReport({
      year: get1BasedDate().y,
      month: get1BasedDate().m,
    });
    downloadFile(`Tasks for ${formatDate(Date.now(), "y/m")}.txt`, report);
    setLoading(false);
  };

  return (
    <div className="wt-tasks-toolbar wt-pad-b-end-12">
      <Button onClick={_addNewTask}>Add task</Button>
      <Button
        onClick={_createReport}
        disabled={!tasks.length}
        loading={loading}
      >
        Create report
      </Button>
      {editDialog}
    </div>
  );
}
