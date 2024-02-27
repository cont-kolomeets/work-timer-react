import { useState } from "react";
import { ConfirmationDialog } from "../ui/ConfirmationDialog/ConfirmationDialog";

export function useConfirmationDialog() {
  const [dialogState, setDialogState] = useState<{
    shown: boolean;
    title?: string;
    message: string;
    onYes(): void;
    onNo(): void;
  }>({
    shown: false,
    message: "",
    onYes: () => {},
    onNo: () => {},
  });

  const confirmationDialog = dialogState.shown ? (
    <ConfirmationDialog
      title={dialogState.title}
      message={dialogState.message}
      onYes={dialogState.onYes}
      onNo={dialogState.onNo}
      onClosed={() => {
        setDialogState((state) => {
          const s = { ...state };
          s.shown = false;
          return s;
        });
      }}
    ></ConfirmationDialog>
  ) : null;

  return {
    confirmationDialog,
    openConfirmationDialog: ({
      title,
      message,
      onYes,
      onNo,
    }: {
      title?: string;
      message: string;
      onYes(): void;
      onNo(): void;
    }) => {
      setDialogState({
        shown: true,
        title,
        message,
        onYes,
        onNo,
      });
    },
  };
}
