import { ReactNode } from "react";

type GridCellProps = {
  label: string;
  cIndex: number;
  markerColor?: string | null;
};

export default function GridCell({
  label,
  cIndex,
  markerColor,
}: GridCellProps) {
  let markerNode: ReactNode;
  if (markerColor) {
    markerNode = (
      <div
        className="wt-grid-row__cell-marker"
        style={{ backgroundColor: markerColor }}
      ></div>
    );
  }

  return (
    <div
      key={label}
      className={"wt-flex-row wt-grid-row__cell wt-grid_column-" + cIndex}
      style={{ position: "relative" }}
    >
      {label}
      {markerNode}
    </div>
  );
}
