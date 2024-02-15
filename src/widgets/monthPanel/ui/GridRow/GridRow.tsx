import { ReactNode } from "react";

type GridRowProps = {
  isHeader?: boolean;
  isCurrentDay?: boolean;
  rowClass?: string;
  onClick?(): void;
  children: ReactNode;
};

export function GridRow({
  isHeader,
  isCurrentDay,
  rowClass,
  onClick,
  children
}: GridRowProps) {
  return (
    <div
      className={
        "wt-flex-row wt-grid-row" +
        (isHeader ? " wt-grid-row_header" : "") +
        (isCurrentDay ? " wt-grid-row_current-day" : "") +
        (rowClass ? " " + rowClass : "")
      }
      onClick={onClick}
    >{children}</div>
  );
}
