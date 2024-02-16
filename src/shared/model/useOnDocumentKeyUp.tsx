import { useEffect } from "react";

export function useOnDocumentKeyUp({
  key,
  onKeyUp,
}: {
  key: "Escape" | " ";
  onKeyUp(): void;
}) {
  useEffect(() => {
    function _onKeyUp(event: KeyboardEvent) {
      event.key === key && onKeyUp();
    }
    document.body.addEventListener("keyup", _onKeyUp);
    return () => {
      window.removeEventListener("keyup", _onKeyUp);
    };
  }, [key, onKeyUp]);
}
