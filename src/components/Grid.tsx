import { ReactNode } from "react";
import { formatTotal } from "../utils/TimeConvertUtil";
import "../css/Grid.css";
import { DayInfo } from "../utils/DayInfoUtil";
import { StateItemMonth, StateItemYear } from "../utils/StorageUtil";

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
  content,
  isHeader,
  isCurrentDay,
  rowClass,
  onClick,
}: {
  content: ReactNode;
  isHeader?: boolean;
  isCurrentDay?: boolean;
  rowClass?: string;
  onClick?(): void;
}): ReactNode {
  return (
    <div
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
  index,
  markerColor,
}: {
  label: string;
  index: number;
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
      className={"wt-grid-row__cell wt-grid_column-" + index}
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
  let index = 0;
  const headerCells = COLUMNS.map((c) =>
    _createCell({ label: c.label, index: index++ })
  );
  return _createRow({ content: headerCells, isHeader: true });
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
  return data.map((data) => {
    let index = 0;
    const cells = COLUMNS.map((c) => {
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
      return _createCell({ label, index: index++, markerColor });
    });

    return _createRow({
      content: cells,
      isCurrentDay: data.isCurrent,
      rowClass: "wt-grid-row_clickable",
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
