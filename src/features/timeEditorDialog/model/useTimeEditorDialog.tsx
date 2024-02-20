import { useMemo, useState } from "react";
import { TimeEditorDialog } from "../ui/TimeEditorDialog/TimeEditorDialog";

export function useTimeEditorDialog({
  time,
  onSetTime,
}: {
  time: number;
  onSetTime(time: number): void;
}) {
  const [editDialogShown, setEditDialogShown] = useState(false);
  const savedTime = useMemo(() => ({ value: -1 }), []);

  const editDialog = editDialogShown ? (
    <TimeEditorDialog
      time={time}
      onSave={(time) => {
        savedTime.value = time;
      }}
      onClosed={() => {
        setEditDialogShown(false);
        savedTime.value !== -1 && onSetTime(savedTime.value);
        savedTime.value = -1;
      }}
    ></TimeEditorDialog>
  ) : null;

  return {
    editDialog,
    setEditDialogShown,
  };
}
