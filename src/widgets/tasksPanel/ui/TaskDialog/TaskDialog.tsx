import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { Dialog } from "../../../../entities/dialog";
import { SavedState_Task } from "../../../../shared/api";
import { partsToTotal, totalToParts } from "../../../../shared/lib";
import { Button } from "../../../../shared/ui";
import "./TaskDialog.scss";

type TaskDialogProps = {
  task: SavedState_Task | null;
  onSave(task: SavedState_Task): void;
  onClosed(): void;
};

export function TaskDialog({ task, onSave, onClosed }: TaskDialogProps) {
  const [taskId, setTaskId] = useState("");
  const [taskLink, setTaskLink] = useState("");
  const [taskLabel, setTaskLabel] = useState("");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [canSave, setCanSave] = useState(false);

  useEffect(() => {
    setTaskId(task?.id || nanoid(8));
    setTaskLink(task?.link || "");
    setTaskLabel(task?.label || "");
    const ps = totalToParts(task?.time || 0);
    setHours(ps.h);
    setMinutes(ps.m);
  }, [task]);

  useEffect(() => {
    setCanSave(!!(taskLink && taskLabel && (minutes || hours)));
  }, [taskLink, taskLabel, minutes, hours]);

  return (
    <Dialog
      title={task ? "Edit task" : "Add task"}
      className="wt-task-dialog"
      onClosed={onClosed}
      children={(closeDialog) => {
        const _handleEnter = (event: React.KeyboardEvent) => {
          event.key === "Enter" && _save();
        };

        const _save = () => {
          onSave({
            id: taskId,
            link: taskLink,
            label: taskLabel,
            time: partsToTotal({ h: hours, m: minutes }),
            modified: Date.now(),
          });
          closeDialog();
        };

        return (
          <>
            <div className="wt-task-dialog-settings">
              <div className="wt-m-b-12">
                <div>Issue</div>
                <input
                  value={taskLink || ""}
                  onChange={(event) => setTaskLink(event.target.value)}
                  onKeyUp={_handleEnter}
                ></input>
              </div>
              <div className="wt-m-b-12">
                <div>Label</div>
                <textarea
                  value={taskLabel}
                  onChange={(event) => setTaskLabel(event.target.value)}
                  onKeyUp={_handleEnter}
                ></textarea>
              </div>
            </div>
            <div className="wt-m-b-12 wt-task-dialog-settings-2">
              <div>Hours</div>
              <input
                value={hours + ""}
                onChange={(event) => setHours(+event.target.value)}
                onKeyUp={_handleEnter}
              ></input>
              <div></div>
              <div>Minutes</div>
              <input
                value={minutes + ""}
                onChange={(event) => setMinutes(+event.target.value)}
                onKeyUp={_handleEnter}
              ></input>
            </div>
            <div className="wt-flex-row wt-flex-end wt-m-b-12">
              <Button
                className="wt-timer-toggle-button"
                disabled={!canSave}
                onClick={_save}
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
