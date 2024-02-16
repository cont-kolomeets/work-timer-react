import { ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  useFadeInOutTransition,
  useOnDocumentKeyUp,
} from "../../../../shared/model";
import { PanelHeader } from "../../../../shared/ui";
import "./Dialog.scss";

type DialogProps = {
  title: string;
  className: string;
  children(onClose: () => void): ReactNode;
  onClosed(): void;
};

export function Dialog({ title, className, children, onClosed }: DialogProps) {
  const { content, setDisplay } = useFadeInOutTransition({
    content: (refNode, closeDialog) => {
      const dialog: ReactNode = (
        <div
          ref={refNode}
          className={`wt-stretched wt-flex-row wt-flex-center wt-dialog-bg`}
        >
          <div className={`wt-dialog ${className}`}>
            <PanelHeader title={title} onClose={closeDialog} />
            <div className="wt-pad-12 wt-dialog__content">
              {children(closeDialog)}
            </div>
          </div>
        </div>
      );
      return <>{createPortal(dialog, document.body)}</>;
    },
    classNames: "wt-dialog-bg",
    onClosed,
    timeout: 500,
  });

  useOnDocumentKeyUp({
    key: "Escape",
    onKeyUp: () => setDisplay(false),
  });

  return content;
}