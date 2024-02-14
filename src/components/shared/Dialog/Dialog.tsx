import "./Dialog.scss";
import { ReactNode, useState, useEffect, useCallback } from "react";
import PanelHeader from "../PanelHeader/PanelHeader";
import { createPortal } from "react-dom";

type DialogProps = {
  title: string;
  className: string;
  children: ReactNode;
  open: boolean;
  onClose(): void;
};

export default function Dialog({
  title,
  className,
  children,
  open,
  onClose,
}: DialogProps) {
  const [display, setDisplay] = useState<"" | "shown" | "hidden">("");
  const [animationState, setAnimationState] = useState<"" | "shown" | "hidden">("");

  const _closeDialog = useCallback(() => {
    setDisplay("hidden"); // will trigger the animation
    setTimeout(() => onClose(), 500); // will notify the parent
  }, [onClose]);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setDisplay((state) => (state === "" ? "shown" : state)); // will trigger the animation
      });
    } else {
      _closeDialog();
    }
  }, [open, _closeDialog]);

  const dialog: ReactNode = (
    <div
      className={`wt-stretched wt-flex-row wt-flex-center wt-dialog-bg ${display}`}
    >
      <div className={`wt-dialog ${className}`}>
        <PanelHeader title={title} onClose={_closeDialog} />
        <div className="wt-pad-12 wt-dialog__content">{children}</div>
      </div>
    </div>
  );

  return <>{createPortal(dialog, document.body)}</>;
}
