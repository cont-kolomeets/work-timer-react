import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/redux/hooks";
import { useDateEditorDialog } from "../../../features/timeEditorDialog/model/useDateEditorDialog";
import { client } from "../../../shared/api";
import { formatDate } from "../../../shared/lib";
import { downloadFile } from "../lib/fileUtil";
import { tasksModel } from "./tasksModel";
import { useTaskDialog } from "./useTaskDialog";

function _useEditDateDialog() {
  const dispatch = useAppDispatch();
  const [editedDate, setEditedDate] = useState({ year: 0, month: 0 });

  const { editDialog, setEditDialogShown } = useDateEditorDialog({
    year: editedDate.year,
    month: editedDate.month,
    onSetDate: (year, month) => {
      dispatch(tasksModel.actions.setDate({ year, month }));
      dispatch(tasksModel.actions.fetchTasks());
    },
  });

  return {
    editDialog,
    editDate: (year: number, month: number) => {
      setEditedDate({ year, month });
      setEditDialogShown(true);
    },
  };
}

function _useChangeMonth() {
  const dispatch = useAppDispatch();
  return {
    changeMonth: (
      year: number,
      month: number,
      type: "prev" | "next" | "reset"
    ) => {
      if (type === "next") {
        month++;
        if (month > 12) {
          month = 1;
          year++;
        }
      } else {
        month--;
        if (month === 0) {
          month = 12;
          year--;
        }
      }
      dispatch(tasksModel.actions.setDate({ year, month }));
      dispatch(tasksModel.actions.fetchTasks());
    },
  };
}

export function useTasksToolbar() {
  const year = useAppSelector(tasksModel.selectors.getYear);
  const month = useAppSelector(tasksModel.selectors.getMonth);
  const [loading, setLoading] = useState(false);
  const { editTaskDialog, setTaskEditDialogShown } = useTaskDialog({
    task: null,
  });
  const { changeMonth } = _useChangeMonth();
  const { editDialog: editDateDialog, editDate } = _useEditDateDialog();

  const addNewTask = () => {
    setTaskEditDialogShown(true);
  };

  const createReport = async () => {
    setLoading(true);
    const report = await client.createReport({
      year,
      month,
    });
    downloadFile(`Tasks for ${formatDate(Date.now(), "y/m")}.txt`, report);
    setLoading(false);
  };

  return {
    year,
    month,
    loading,
    editTaskDialog,
    addNewTask,
    createReport,
    changeMonth,
    editDateDialog,
    editDate,
  };
}
