import "./TaskDialog.scss";
import Dialog from "../../shared/Dialog/Dialog";
import { SavedState_Task } from "../../../model/interfaces";
import { useState, useEffect } from "react";
import { nanoid } from "@reduxjs/toolkit";

type TaskDialogProps = {
  task: SavedState_Task | null;
  onSave(task: SavedState_Task): void;
  onClosed(): void;
};

export default function TaskDialog({ task, onSave, onClosed }: TaskDialogProps) {
  const [issueNumber, setIssueNumber] = useState<number | null>(null);
  const [taskLabel, setTaskLabel] = useState("");
  const [canSave, setCanSave] = useState(false);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setIssueNumber(task?.issueNumber || null);
    setTaskLabel(task?.label || "");
  }, [task]);

  useEffect(() => {
    setCanSave(!!(issueNumber && taskLabel));
  }, [issueNumber, taskLabel]);

  useEffect(() => {
    !open && onClose();
  }, [open, onClose]);

  return (
    <Dialog
      title={task ? "Edit task" : "Add task"}
      className="wt-task-dialog"
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <div className="wt-task-dialog-settings">
        <div className="wt-margin-block-12">
          <div>Issue #:</div>
          <input
            className="wt-task-dialog-settings__issue"
            value={issueNumber || ""}
            onChange={(event) => setIssueNumber(+event.target.value)}
          ></input>
        </div>
        <div className="wt-margin-block-12">
          <div>Label:</div>
          <textarea
            className="wt-task-dialog-settings__label"
            value={taskLabel}
            onChange={(event) => setTaskLabel(event.target.value)}
          ></textarea>
        </div>
      </div>

      <div className="wt-flex-row wt-flex-end wt-margin-block-12">
        <button
          className={`wt-round-button wt-timer-toggle-button ${
            canSave ? "" : "wt-round-button_disabled"
          }`}
          onClick={() => {
            onSave({
              id: task?.id || nanoid(8),
              issueNumber: issueNumber as number,
              label: taskLabel,
              modified: Date.now(),
            });
            setOpen(false);
          }}
        >
          Save
        </button>
      </div>
    </Dialog>
  );
}
