import { ReactNode } from "react";
import { Loader } from "../Loader/Loader";
import "./Button.scss";

export function Button({
  className,
  disabled,
  loading,
  onClick,
  children,
}: {
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick(): void;
  children: ReactNode;
}) {
  return (
    <button
      className={`wt-round-button wt-relative${
        !disabled ? "" : " wt-round-button--disabled"
      } ${className || ""}`}
      onClick={onClick}
    >
      <div style={{ visibility: loading ? "hidden" : "visible" }}>
        {children}
      </div>
      {loading ? <Loader size="s" /> : null}
    </button>
  );
}
