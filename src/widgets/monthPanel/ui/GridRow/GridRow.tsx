import { ReactNode } from "react";

type GridRowProps = {
  isHeader?: boolean;
  isCurrentDay?: boolean;
  rowClass?: string;
  children: ReactNode;
};

export function GridRow({
  isHeader,
  isCurrentDay,
  rowClass,
  children,
}: GridRowProps) {
  return (
    <div
      className={
        "wt-flex-row wt-grid-row" +
        (isHeader ? " wt-grid-row--header" : "") +
        (isCurrentDay ? " wt-grid-row--current-day" : "") +
        (rowClass ? " " + rowClass : "")
      }
    >
      {children}
    </div>
  );
}
