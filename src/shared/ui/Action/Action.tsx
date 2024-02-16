type IconName =
  | "x"
  | "chevron-double-left"
  | "chevron-double-right"
  | "pencil-square"
  | "trash-fill"
  | "pencil";

export function Action({
  name,
  className,
  size,
  onClick,
}: {
  name: IconName;
  className?: string;
  size?: number | string;
  onClick?(): void;
}) {
  return (
    <i
      className={`bi bi-${name} wt-clickable wt-action-button-${size || 20} ${
        className || ""
      }`}
      onClick={onClick}
    ></i>
  );
}
