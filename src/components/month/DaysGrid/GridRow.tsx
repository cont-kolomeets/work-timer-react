import { ReactNode } from "react";

type GridRowProps = {
  rIndex: number;
  isHeader?: boolean;
  isCurrentDay?: boolean;
  rowClass?: string;
  onClick?(): void;
  children: ReactNode;
};

export default function GridRow({
  rIndex,
  isHeader,
  isCurrentDay,
  rowClass,
  onClick,
}: GridRowProps) {
  return (
    <div
      key={rIndex}
      className={
        "wt-flex-row wt-grid-row" +
        (isHeader ? " wt-grid-row_header" : "") +
        (isCurrentDay ? " wt-grid-row_current-day" : "") +
        (rowClass ? " " + rowClass : "")
      }
      onClick={onClick}
    ></div>
  );
}
