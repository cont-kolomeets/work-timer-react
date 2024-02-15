import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./Alert.scss";

type AlertProps = {
  title: string;
  message: string;
  onClosed(): void;
};

export function Alert({ title, message, onClosed }: AlertProps) {
  const [display, setDisplay] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setDisplay(true);
    }, 100);
  }, []);

  return (
    <>
      <CSSTransition
        in={display}
        nodeRef={nodeRef}
        timeout={1000}
        classNames="wt-alert"
        unmountOnExit
        onEntered={() => {
          setTimeout(() => {
            setDisplay(false);
          }, 5000);
        }}
        onExited={() => onClosed()}
      >
        <div
          ref={nodeRef}
          className={`wt-flex-row wt-flex-center wt-alert ${display}`}
        >
          <div className="wt-flex-spacer wt-pad-12">
            <div className="wt-margin-block-12 wt-alert__title">{title}</div>
            <div className="wt-margin-block-12">{message}</div>
          </div>
          <div className="wt-pad-12">
            <i
              className="bi bi-x wt-action-button"
              onClick={() => setDisplay(false)}
            ></i>
          </div>
        </div>
      </CSSTransition>
    </>
  );
}
