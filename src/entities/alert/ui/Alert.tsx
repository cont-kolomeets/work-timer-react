import { useFadeInOutTransition } from "../../../shared/model";
import { Action } from "../../../shared/ui";
import "./Alert.scss";

type AlertProps = {
  title: string;
  message: string;
  link?: string;
  timeout?: number;
  onLinkClick?(): void;
  onClosed(): void;
};

export function Alert({
  title,
  message,
  link,
  timeout,
  onLinkClick,
  onClosed,
}: AlertProps) {
  return useFadeInOutTransition({
    content: (nodeRef, closeAlert) => {
      return (
        <div ref={nodeRef} className="wt-flex-row wt-flex-center wt-alert">
          <div className="wt-flex-spacer wt-pad-12">
            <div className="wt-m-b-8 wt-alert__title">{title}</div>
            <div className="wt-flex-row wt-flex-gap-12">
              <div className="wt-m-b-12 wt-flex-spacer">{message}</div>
              {link && onLinkClick ? (
                <div
                  className="wt-clickable wt-link"
                  onClick={() => {
                    onLinkClick();
                    closeAlert();
                  }}
                >
                  {link}
                </div>
              ) : null}
            </div>
          </div>
          <div className="wt-pad-12">
            <Action name="x" onClick={closeAlert} size="20" />
          </div>
        </div>
      );
    },
    classNames: "wt-alert",
    onClosed,
    timeout: 500,
    autoHideTimeout: timeout || 2000,
  }).content;
}
