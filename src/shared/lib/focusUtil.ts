import { useEffect, useRef, useState } from "react";

export function useInputFocus() {
  const [element, setElement] = useState<HTMLInputElement | null>(null);
  const setFocus = () => {
    element?.focus();
    element?.select();
    return !!element;
  };
  return { element, setElement, setFocus };
}

export function useInputFocusOnCreate() {
  const { element, setFocus, setElement } = useInputFocus();
  let focused = useRef(false);
  useEffect(() => {
    if (!focused.current) {
      focused.current = setFocus();
    }
  }, [element, setFocus, focused]);
  return { setElement };
}
