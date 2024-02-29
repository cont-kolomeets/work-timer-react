import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/redux/hooks";
import { useDateEditorDialog } from "../../../../features/timeEditorDialog/model/useDateEditorDialog";
import { format2digit } from "../../../../shared/lib";
import { Action } from "../../../../shared/ui";
import { gridModel } from "../../model/gridModel";
import "./GridToolbar.scss";

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

export function GridToolbar({ onEditStart }: { onEditStart(): void }) {
  const year = useAppSelector(gridModel.selectors.getYear);
  const month = useAppSelector(gridModel.selectors.getMonth);
  const { changeMonth } = _useChangeMonth({ onEditStart });
  const { editDialog: editDateDialog, editDate } = _useEditDateDialog({
    onEditStart,
  });

  return (
    <div className="wt-flex-row wt-m-b-end-12 wt-clickable wt-days-grid__date">
      <Action
        name="chevron-left"
        size="16"
        className="wt-m-i-start-12"
        onClick={() => changeMonth(year, month, "prev")}
      />
      <div
        className=" wt-flex-row wt-flex-center wt-flex-spacer"
        onClick={() => editDate(year, month)}
      >{`${year}.${format2digit(month)}`}</div>
      <Action
        name="pencil"
        size="16"
        className="wt-m-i-start-12"
        onClick={() => editDate(year, month)}
      />
      <Action
        name="arrow-clockwise"
        size="16"
        className="wt-m-i-start-12"
        onClick={() => changeMonth(year, month, "reset")}
      />
      <Action
        name="chevron-right"
        size="16"
        className="wt-m-i-start-12"
        onClick={() => changeMonth(year, month, "next")}
      />
      {editDateDialog}
    </div>
  );
}
