import { useRef, useState } from "react";
import { TimeEditorDialog } from "../ui/TimeEditorDialog/TimeEditorDialog";

export function useTimeEditorDialog({
  time,
  onSetTime,
}: {
  time: number;
  onSetTime(time: number): void;
}) {
  const [editDialogShown, setEditDialogShown] = useState(false);
  const savedTime = useRef(-1);

  const editDialog = editDialogShown ? (
    <TimeEditorDialog
      time={time}
      onSave={(time) => {
        savedTime.current = time;
      }}
      onClosed={() => {
        setEditDialogShown(false);
        savedTime.current !== -1 && onSetTime(savedTime.current);
        savedTime.current = -1;
      }}
    ></TimeEditorDialog>
  ) : null;

  return {
    editDialog,
    setEditDialogShown,
  };
}
