import { useState } from "react";
import { TimeEditorDialog } from "../ui/TimeEditorDialog/TimeEditorDialog";

export function useTimeEditorDialog({
  time,
  onSetTime,
}: {
  time: number;
  onSetTime(time: number): void;
}) {
  const [editDialogShown, setEditDialogShown] = useState(false);

  const editDialog = editDialogShown ? (
    <TimeEditorDialog
      time={time}
      onSave={(time) => {
        onSetTime(time);
      }}
      onClosed={() => {
        setEditDialogShown(false);
      }}
    ></TimeEditorDialog>
  ) : null;

  return {
    editDialog,
    setEditDialogShown,
  };
}
