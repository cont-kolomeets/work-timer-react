import { useFadeInOutTransition } from "../../../shared/model";
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
            <div className="wt-margin-block-12 wt-alert__title">{title}</div>
            <div className="wt-margin-block-12">{message}</div>
          </div>
          <div className="wt-pad-12">
            <i
              className="bi bi-x wt-action-button"
              onClick={() => closeAlert()}
            ></i>
          </div>
        </div>
      );
    },
    classNames: "wt-alert",
    onClosed,
    timeout: 1000,
    autoHideTimeout: 5000,
  });
}
