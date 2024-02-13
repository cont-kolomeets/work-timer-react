import "./Dialog.scss";
import { ReactNode, useState } from "react";
import PanelHeader from "../PanelHeader/PanelHeader";

type DialogProps = {
  title: string;
  className: string;
  children: ReactNode;
};

export default function Dialog({ title, className, children }: DialogProps) {
  const [shown, setShown] = useState<"" | "shown" | "hidden">("");
  const _closeDialog = () => {
    setShown("hidden");
  };

  return (
    <div className={`wt-dialog  ${className} ${shown}`}>
      <PanelHeader title={title} onClose={_closeDialog} />
      <div className="wt-dialog-content wt-pad-12">{children}</div>
    </div>
  );
}
