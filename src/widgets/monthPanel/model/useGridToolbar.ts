import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/redux/hooks";
import { useDateEditorDialog } from "../../../features/timeEditorDialog/model/useDateEditorDialog";
import { gridModel } from "./gridModel";

function _useEditDateDialog({ onEditStart }: { onEditStart(): void }) {
  const dispatch = useAppDispatch();
  const [editedDate, setEditedDate] = useState({ year: 0, month: 0 });

  const { editDialog, setEditDialogShown } = useDateEditorDialog({
    year: editedDate.year,
    month: editedDate.month,
    onSetDate: (year, month) => {
      dispatch(gridModel.actions.setDate({ year, month }));
      dispatch(gridModel.actions.fetchGridData());
    },
  });

  return {
    editDialog,
    editDate: (year: number, month: number) => {
      onEditStart();
      setEditedDate({ year, month });
      setEditDialogShown(true);
    },
  };
}

function _useChangeMonth({ onEditStart }: { onEditStart(): void }) {
  const dispatch = useAppDispatch();
  return {
    changeMonth: (
      year: number,
      month: number,
      type: "prev" | "next" | "reset"
    ) => {
      onEditStart();
      if (type === "reset") {
        dispatch(gridModel.actions.resetDate());
      } else {
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
        dispatch(gridModel.actions.setDate({ year, month }));
      }
      dispatch(gridModel.actions.fetchGridData());
    },
  };
}

export function useGridToolbar(onEditStart: () => void) {
  const year = useAppSelector(gridModel.selectors.getYear);
  const month = useAppSelector(gridModel.selectors.getMonth);
  const { changeMonth } = _useChangeMonth({ onEditStart });
  const { editDialog: editDateDialog, editDate } = _useEditDateDialog({
    onEditStart,
  });

  return {
    year,
    month,
    editDateDialog,
    changeMonth,
    editDate,
  };
}
