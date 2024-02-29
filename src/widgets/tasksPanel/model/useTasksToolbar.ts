import { useState } from "react";
import { client } from "../../../shared/api";
import { formatDate, get1BasedDate } from "../../../shared/lib";
import { downloadFile } from "../lib/fileUtil";
import { useTaskDialog } from "./useTaskDialog";

export function useTasksToolbar() {
  const [loading, setLoading] = useState(false);
  const { editDialog, setEditDialogShown } = useTaskDialog({ task: null });

  const addNewTask = () => {
    setEditDialogShown(true);
  };

  const createReport = async () => {
    setLoading(true);
    const report = await client.createReport({
      year: get1BasedDate().y,
      month: get1BasedDate().m,
    });
    downloadFile(`Tasks for ${formatDate(Date.now(), "y/m")}.txt`, report);
    setLoading(false);
  };

  return {
    loading,
    editDialog,
    addNewTask,
    createReport,
  };
}
