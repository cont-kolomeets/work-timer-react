import { useFadeInOutTransition } from "../../../shared/model";
import { Action } from "../../../shared/ui";
import "./Alert.scss";

type AlertProps = {
  title: string;
  message: string;
  onClosed(): void;
};

export function Alert({ title, message, onClosed }: AlertProps) {
  return useFadeInOutTransition({
    content: (nodeRef, closeAlert) => {
      return (
        <div ref={nodeRef} className={`wt-flex-row wt-flex-center wt-alert`}>
          <div className="wt-flex-spacer wt-pad-12">
            <div className="wt-m-b-12 wt-alert__title">{title}</div>
            <div className="wt-m-b-12">{message}</div>
          </div>
          <div className="wt-pad-12">
            <Action name="x" onClick={closeAlert} />
          </div>
        </div>
      );
    },
    classNames: "wt-alert",
    onClosed,
    timeout: 500,
    autoHideTimeout: 2000,
  }).content;
}
