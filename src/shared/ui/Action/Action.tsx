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
  onClick,
}: {
  name: IconName;
  className?: string;
  onClick(): void;
}) {
  return (
    <i
      className={`bi bi-${name} wt-action-button ${className || ""}`}
      onClick={onClick}
    ></i>
  );
}
