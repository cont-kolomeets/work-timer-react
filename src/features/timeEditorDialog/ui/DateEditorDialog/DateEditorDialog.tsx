import { useEffect, useState } from "react";
import { Dialog } from "../../../../entities/dialog";
import { Button } from "../../../../shared/ui";
import "./TimeEditorDialog.scss";

type DateEditorDialogProps = {
  year: number;
  month: number;
  onSave(year: number, month: number): void;
  onClosed(): void;
};

export function DateEditorDialog({
  year,
  month,
  onSave,
  onClosed,
}: DateEditorDialogProps) {
  const [y, setYear] = useState(0);
  const [m, setMonth] = useState(0);

  useEffect(() => {
    setYear(year);
    setMonth(month);
  }, [year, month]);

  return (
    <Dialog
      title="Edit time"
      className="wt-time-editor-dialog"
      onClosed={onClosed}
      children={(closeDialog) => {
        return (
          <>
            <div className="wt-flex-row">
              <div className="wt-m-12">Year</div>
              <div className="wt-12">
                <input
                  value={y + ""}
                  onChange={(event) => setYear(+event.target.value)}
                ></input>
              </div>
              <div className="wt-m-12">Minutes</div>
              <div className="wt-m-12">
                <input
                  value={m + ""}
                  onChange={(event) => setMonth(+event.target.value)}
                ></input>
              </div>
            </div>
            <div className="wt-flex-row wt-flex-end wt-m-b-12">
              <Button
                onClick={() => {
                  onSave(y, m);
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
