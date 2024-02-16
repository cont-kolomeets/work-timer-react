import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { Dialog } from "../../../../entities/dialog";
import { SavedState_Task } from "../../../../shared/model";
import { Button } from "../../../../shared/ui";
import "./TaskDialog.scss";

type TaskDialogProps = {
  task: SavedState_Task | null;
  onSave(task: SavedState_Task): void;
  onClosed(): void;
};

export function TaskDialog({ task, onSave, onClosed }: TaskDialogProps) {
  const [issueNumber, setIssueNumber] = useState<number | null>(null);
  const [taskLabel, setTaskLabel] = useState("");
  const [canSave, setCanSave] = useState(false);

  useEffect(() => {
    setIssueNumber(task?.issueNumber || null);
    setTaskLabel(task?.label || "");
  }, [task]);

  useEffect(() => {
    setCanSave(!!(issueNumber && taskLabel));
  }, [issueNumber, taskLabel]);

  return (
    <Dialog
      title={task ? "Edit task" : "Add task"}
      className="wt-task-dialog"
      onClosed={onClosed}
      children={(closeDialog) => {
        return (
          <>
            <div className="wt-task-dialog-settings">
              <div className="wt-m-b-12">
                <div>Issue #:</div>
                <input
                  value={issueNumber || ""}
                  onChange={(event) => setIssueNumber(+event.target.value)}
                ></input>
              </div>
              <div className="wt-m-b-12">
                <div>Label:</div>
                <textarea
                  value={taskLabel}
                  onChange={(event) => setTaskLabel(event.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="wt-flex-row wt-flex-end wt-m-b-12">
              <Button
                className="wt-timer-toggle-button"
                disabled={!canSave}
                onClick={() => {
                  onSave({
                    id: task?.id || nanoid(8),
                    issueNumber: issueNumber as number,
                    label: taskLabel,
                    modified: Date.now(),
                  });
                  closeDialog();
                }}
              >
                Save
              </Button>
            </div>
          </>
        );
      }}
    />
  );
}
