import { ReactNode } from "react";
import { Action } from "../../../../shared/ui";

type GridCellProps = {
  label: string;
  cIndex: number;
  isHeader: boolean;
  markerColor?: string | null;
  onEditTime?(): void;
};

export function GridCell({
  label,
  cIndex,
  isHeader,
  markerColor,
  onEditTime,
}: GridCellProps) {
  const canEditTime = !isHeader && cIndex === 1 && onEditTime;

  let markerNode: ReactNode;
  if (markerColor) {
    markerNode = (
      <div
        className="wt-grid-row__cell-marker"
        style={{ border: `2px solid ${markerColor}` }}
      ></div>
    );
  }

  return (
    <div
      className={"wt-flex-row wt-grid-row__cell wt-grid_column-" + cIndex}
      style={{ position: "relative" }}
    >
      <div
        className={`wt-flex-spacer ${canEditTime ? "wt-clickable" : ""}`}
        onClick={() => {
          canEditTime && onEditTime();
        }}
      >
        {label}
      </div>
      {markerNode}
      {canEditTime && (
        <Action
          name="pencil"
          size="16"
          className="wt-m-i-start-12"
          onClick={onEditTime}
        />
      )}
    </div>
  );
}
