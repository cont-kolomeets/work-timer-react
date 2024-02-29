import { Dialog } from "../../../../entities/dialog";
import { Button } from "../../../../shared/ui";
import "./ConfirmationDialog.scss";

type ConfirmationDialogProps = {
  title?: string;
  message: string;
  onYes(): void;
  onNo(): void;
  onClosed(): void;
};

export function ConfirmationDialog({
  title,
  message,
  onYes,
  onNo,
  onClosed,
}: ConfirmationDialogProps) {
  return (
    <Dialog
      title={title || "Please confirm"}
      className="wt-time-editor-dialog"
      onClosed={onClosed}
      children={(closeDialog) => {
        return (
          <>
            <div className="wt-flex-row wt-m-20 wt-m-b-end-28">{message}</div>
            <div className="wt-flex-row wt-flex-end wt-m-b-12 wt-flex-gap-8">
              <Button
                onClick={() => {
                  closeDialog();
                  onNo();
                }}
              >
                No
              </Button>
              <Button
                onClick={() => {
                  closeDialog();
                  onYes();
                }}
              >
                Yes
              </Button>
            </div>
          </>
        );
      }}
    />
  );
}
