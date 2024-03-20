import { useEffect, useState } from "react";
import { Dialog } from "../../../../entities/dialog";
import { useInputFocusOnCreate } from "../../../../shared/lib";
import { Button } from "../../../../shared/ui";
import "./DateEditorDialog.scss";

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
  const { setElement } = useInputFocusOnCreate();

  useEffect(() => {
    setYear(year);
    setMonth(month);
  }, [year, month]);

  return (
    <Dialog
      title="Edit date"
      className="wt-time-editor-dialog"
      onClosed={onClosed}
      children={(closeDialog) => {
        const _handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
          event.key === "Enter" && _save();
        };

        const _save = () => {
          onSave(y, m);

          closeDialog();
        };

        return (
          <>
            <div className="wt-flex-row">
              <div className="wt-m-12">Year</div>
              <div className="wt-m-12">
                <input
                  ref={setElement}
                  value={y + ""}
                  onChange={(event) => setYear(+event.target.value)}
                  onKeyUp={_handleEnter}
                ></input>
              </div>
              <div className="wt-m-12">Month</div>
              <div className="wt-m-12">
                <input
                  value={m + ""}
                  onChange={(event) => setMonth(+event.target.value)}
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
