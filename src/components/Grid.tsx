import { ReactNode } from "react";
import { formatTotal } from "../utils/TimeConvertUtil";
import "../css/Grid.css";

type GridData = {
  isCurrent: boolean;
  isTotal: boolean;
  isDept: boolean;
  dayIndex: number;
  dayTime: number;
};

type GridProps = {
  data: GridData[];
  monthCompletionObject: {
    timeNeeded: number;
  };
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
        "gridRow" +
        (isHeader ? " gridHeader" : "") +
        (isCurrentDay ? " currentDay" : "") +
        (rowClass ? " " + rowClass : "")
      }
      onClick={onClick}
    >
      {content}
    </div>
  );
}

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
        className="gridCellMarker"
        style={{ backgroundColor: markerColor }}
      ></div>
    );
  }

  return (
    <div
      className={"gridCell gridColumn" + index}
      style={{ position: "relative" }}
    >
      {label}
      {markerNode}
    </div>
  );
}

function Grid({ data, monthCompletionObject, onDataEdited }: GridProps) {
  // header
  let index = 0;
  const headerCells = COLUMNS.map((c) =>
    _createCell({ label: c.label, index: index++ })
  );
  let headerRow = _createRow({ content: headerCells, isHeader: true });

  // rows
  const rows = data.map((data) => {
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
            data[c.field] < _8h
              ? "red"
              : data[c.field] > _10h
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
      rowClass: "clickable",
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

  return (
    <div>
      {headerRow}
      {rows}
    </div>
  );
}

export default Grid;
