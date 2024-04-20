import { Loader } from "../Loader/Loader";
import "./Action.scss";

export type IconName =
  | "x"
  | "chevron-left"
  | "chevron-right"
  | "chevron-double-left"
  | "chevron-double-right"
  | "pencil-square"
  | "trash"
  | "pencil"
  | "arrow-clockwise"
  | "plus-lg"
  | "download"
  | "calendar-day"
  | "calendar-month"
  | "box-arrow-right"
  | "exclamation-triangle"
  | "check-circle";

export function Action({
  name,
  className,
  size,
  disabled,
  loading,
  onClick,
}: {
  name: IconName;
  className?: string;
  size: "16" | "20";
  disabled?: boolean;
  loading?: boolean;
  onClick?(): void;
}) {
  return (
    <i
      className={`bi bi-${name} wt-relative wt-clickable wt-action-button-${
        size || 20
      }${!disabled ? "" : " wt-action-button--disabled"} ${className || ""}`}
      onClick={onClick}
      style={{ color: loading ? "transparent" : "" }}
      tabIndex={1}
      onKeyDown={(event) => event.key === "Enter" && onClick?.()}
      role="button"
    >
      {loading ? <Loader size="s" /> : null}
    </i>
  );
}
