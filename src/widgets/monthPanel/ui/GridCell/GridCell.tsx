import { ReactNode } from "react";

type GridCellProps = {
  label: string;
  cIndex: number;
  markerColor?: string | null;
};

export function GridCell({
  label,
  cIndex,
  markerColor,
}: GridCellProps) {
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
      <div className="wt-flex-spacer">{label}</div>
      {markerNode}
    </div>
  );
}
