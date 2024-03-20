import { useEffect, useState } from "react";
import { Dialog } from "../../../../entities/dialog";
import {
  partsToTotal,
  totalToParts,
  useInputFocusOnCreate,
} from "../../../../shared/lib";
import { Button } from "../../../../shared/ui";
import "./TimeEditorDialog.scss";

type TimeEditorDialogProps = {
  time: number;
  onSave(time: number): void;
  onClosed(): void;
};

export function TimeEditorDialog({
  time,
  onSave,
  onClosed,
}: TimeEditorDialogProps) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const { setElement } = useInputFocusOnCreate();

  useEffect(() => {
    const ps = totalToParts(time);
    setHours(ps.h);
    setMinutes(ps.m);
  }, [time]);

  return (
    <Dialog
      title="Edit time"
      className="wt-time-editor-dialog"
      onClosed={onClosed}
      children={(closeDialog) => {
        const _handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
          event.key === "Enter" && _save();
        };

        const _save = () => {
          onSave(partsToTotal({ h: hours, m: minutes }));
          closeDialog();
        };

        return (
          <>
            <div className="wt-flex-row">
              <div className="wt-m-12">Hours</div>
              <div className="wt-m-12">
                <input
                  ref={(ref) => setElement(ref)}
                  value={hours + ""}
                  onChange={(event) => setHours(+event.target.value)}
                  onKeyUp={_handleEnter}
                ></input>
              </div>
              <div className="wt-m-12">Minutes</div>
              <div className="wt-m-12">
                <input
                  value={minutes + ""}
                  onChange={(event) => setMinutes(+event.target.value)}
                  onKeyUp={_handleEnter}
                ></input>
              </div>
            </div>
            <div className="wt-flex-row wt-flex-end wt-m-b-12">
              <Button onClick={_save}>Save</Button>
            </div>
          </>
        );
      }}
    />
  );
}
