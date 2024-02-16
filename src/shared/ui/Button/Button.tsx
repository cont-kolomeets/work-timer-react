import { ReactNode } from "react";

export function Button({
  className,
  disabled,
  onClick,
  children,
}: {
  className?: string;
  disabled?: boolean;
  onClick(): void;
  children: ReactNode;
}) {
  return (
    <button
      className={`wt-round-button ${
        !disabled ? "" : "wt-round-button_disabled"
      } ${className || ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
