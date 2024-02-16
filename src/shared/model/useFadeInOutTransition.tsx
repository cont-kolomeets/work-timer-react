import { ReactNode, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

export function useFadeInOutTransition({
  content,
  timeout,
  classNames,
  autoHideTimeout,
  onClosed,
}: {
  content: (
    nodeRef: React.MutableRefObject<null>,
    close: () => void
  ) => ReactNode;
  timeout: number;
  classNames: string;
  autoHideTimeout?: number;
  onClosed(): void;
}) {
  const [display, setDisplay] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setDisplay(true);
    }, 100);
  }, []);

  return {
    content: (
      <>
        <CSSTransition
          in={display}
          nodeRef={nodeRef}
          timeout={timeout}
          classNames={classNames}
          unmountOnExit
          onEntered={() => {
            autoHideTimeout &&
              setTimeout(() => {
                setDisplay(false);
              }, autoHideTimeout);
          }}
          onExited={() => onClosed()}
        >
          {content(nodeRef, () => setDisplay(false))}
        </CSSTransition>
      </>
    ),
    setDisplay,
  };
}
