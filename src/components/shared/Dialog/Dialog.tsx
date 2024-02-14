import "./Dialog.scss";
import { ReactNode, useState } from "react";
import PanelHeader from "../PanelHeader/PanelHeader";
import { createPortal } from "react-dom";

type DialogProps = {
  title: string;
  className: string;
  children: ReactNode;
  onClose(): void;
};

export default function Dialog({
  title,
  className,
  children,
  onClose,
}: DialogProps) {
  const [display, setDisplay] = useState<"" | "shown" | "hidden">("");
  const _closeDialog = () => {
    setDisplay("hidden"); // will trigger the animation
    setTimeout(() => onClose(), 500); // will notify the parent
  };

  setTimeout(() => {
    setDisplay((state) => (state === "" ? "shown" : state)); // will trigger the animation
  });

  const dialog: ReactNode = (
    <div
      className={`wt-stretched wt-flex-row wt-flex-center wt-dialog-bg ${className} ${display}`}
    >
      <div className={`wt-dialog ${display}`}>
        <PanelHeader title={title} onClose={_closeDialog} />
        <div className="wt-pad-12 wt-dialog__content">{children}</div>
      </div>
    </div>
  );

  return <>{createPortal(dialog, document.body)}</>;
}
