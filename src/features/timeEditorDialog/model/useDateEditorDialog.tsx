import { useRef, useState } from "react";
import { DateEditorDialog } from "../ui/DateEditorDialog/DateEditorDialog";

export function useDateEditorDialog({
  year,
  month,
  onSetDate,
}: {
  year: number;
  month: number;
  onSetDate(year: number, month: number): void;
}) {
  const [editDialogShown, setEditDialogShown] = useState(false);
  const savedTime = useRef([-1, -1]);

  const editDialog = editDialogShown ? (
    <DateEditorDialog
      year={year}
      month={month}
      onSave={(year, month) => {
        savedTime.current = [year, month];
      }}
      onClosed={() => {
        setEditDialogShown(false);
        savedTime.current[0] !== -1 &&
          onSetDate(savedTime.current[0], savedTime.current[1]);
        savedTime.current = [-1, -1];
      }}
    ></DateEditorDialog>
  ) : null;

  return {
    editDialog,
    setEditDialogShown,
  };
}
