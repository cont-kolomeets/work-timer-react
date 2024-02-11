import { useState } from "react";

export default function usePanelAnimation(): {
  expanded: boolean;
  setExpanded(value: boolean): void;
} {
  const [expanded, setExpanded] = useState(false);
  return {
    expanded,
    setExpanded,
  };
}
