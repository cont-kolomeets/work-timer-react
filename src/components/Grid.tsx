import { ReactNode } from "react";
import { formatTotal } from "../hooks/utils/TimeConvertUtil";
import "../css/Grid.css";
import { DayInfo } from "../hooks/utils/DayInfoUtil";
import { StateItemMonth, StateItemYear } from "../hooks/utils/StorageUtil";

export type GridData = {
  dayIndex: number | string;
  dayTime: number;
  isCurrent?: boolean;
  isTotal?: boolean;
  isDept?: boolean;
  dayInfo?: DayInfo;
  month?: StateItemMonth;
  year?: StateItemYear;
};

type GridProps = {
  data: GridData[];
  monthCompletionObject: {
    timeNeeded: number;
  } | null;
  onDataEdited(data: GridData, value: string): void;
};

const COLUMNS = [
  {
    label: "Day",
    field: "dayIndex",
  },
  {
    label: "Time",
    field: "dayTime",
  },
];

//--------------------------------------------------------------------------
//
// Row
//
//--------------------------------------------------------------------------

function _createRow({
  rIndex,
  content,
  isHeader,
  isCurrentDay,
  rowClass,
  onClick,
}: {
  rIndex: number;
  content: ReactNode;
  isHeader?: boolean;
  isCurrentDay?: boolean;
  rowClass?: string;
  onClick?(): void;
}): ReactNode {
  return (
    <div
      key={rIndex}
      className={
        "wt-grid-row" +
        (isHeader ? " wt-grid-row_header" : "") +
        (isCurrentDay ? " wt-grid-row_current-day" : "") +
        (rowClass ? " " + rowClass : "")
      }
      onClick={onClick}
    >
      {content}
    </div>
  );
}

//--------------------------------------------------------------------------
//
// Cell
//
//--------------------------------------------------------------------------

function _createCell({
  label,
  cIndex,
  markerColor,
}: {
  label: string;
  cIndex: number;
  markerColor?: string | null;
}): ReactNode {
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
      className={"wt-grid-row__cell wt-grid_column-" + cIndex}
      style={{ position: "relative" }}
    >
      {label}
      {markerNode}
    </div>
  );
}

//--------------------------------------------------------------------------
//
// Header
//
//--------------------------------------------------------------------------

function _createHeader(): ReactNode {
  const headerCells = COLUMNS.map((c, cIndex) =>
    _createCell({ label: c.label, cIndex })
  );
  return _createRow({ rIndex: 0, content: headerCells, isHeader: true });
}

//--------------------------------------------------------------------------
//
// Rows
//
//--------------------------------------------------------------------------

function _createRows({
  data,
  monthCompletionObject,
  onDataEdited,
}: GridProps): ReactNode[] {
  return data.map((data, rIndex) => {
    const cells = COLUMNS.map((c, cIndex) => {
      let label: string;
      let markerColor: string | null = null;
      if (c.field === "dayTime") {
        label = formatTotal(data.dayTime, "h:m:s");

        if (data.isTotal) {
          if (monthCompletionObject) {
            label +=
              " / " + formatTotal(monthCompletionObject.timeNeeded, "h:m:s");
          }
        } else if (!data.isDept) {
          let _8h = 8 * 3600000;
          let _10h = 10 * 3600000;
          markerColor =
            data.dayTime < _8h
              ? "red"
              : data.dayTime > _10h
              ? "yellow"
              : "#7fff00";
        }
      } else {
        label = data.dayIndex + "";
      }
      return _createCell({ label, cIndex, markerColor });
    });

    return _createRow({
      content: cells,
      isCurrentDay: data.isCurrent,
      rowClass: "wt-grid-row_clickable",
      rIndex: rIndex + 1 /* header */,
      onClick: () => {
        let value = prompt(
          data.isTotal
            ? "Enter total required time for this month (hh:mm)"
            : "Enter elapsed time for day " + data.dayIndex + " (hh:mm)"
        ) as string;
        onDataEdited(data, value);
      },
    });
  });
}

//--------------------------------------------------------------------------
//
// Grid
//
//--------------------------------------------------------------------------

function Grid({ data, monthCompletionObject, onDataEdited }: GridProps) {
  let headerRow = _createHeader();
  const rows = _createRows({ data, monthCompletionObject, onDataEdited });
  return (
    <div>
      {headerRow}
      {rows}
    </div>
  );
}

export default Grid;
