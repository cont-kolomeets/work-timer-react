import { useEffect, useState } from "react";

export function useInputFocus() {
  const [element, setElement] = useState<HTMLInputElement | null>(null);
  const setFocus = () => {
    element?.focus();
    element?.select();
  };
  return { element, setElement, setFocus };
}

export function useInputFocusOnCreate() {
  const { element, setFocus, setElement } = useInputFocus();
  useEffect(() => {
    setFocus();
  }, [element, setFocus]);
  return { setElement };
}
