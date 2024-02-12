import "./DaysGrid.scss";
import { ReactNode } from "react";
import GridRow from "./GridRow";
import GridCell from "./GridCell";
import { useSelector } from "react-redux";
import { formatTotal } from "../../../utils/TimeConvertUtil";
import { getData } from "./gridSlice";

export type GridData = {
  dayIndex: number | string;
  dayTime: number;
  isCurrent?: boolean;
  isDept?: boolean;
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
// Header
//
//--------------------------------------------------------------------------

function _createHeader(): ReactNode {
  return (
    <GridRow rIndex={0} isHeader={true}>
      {COLUMNS.map((c, cIndex) => {
        return <GridCell label={c.label} cIndex={cIndex}></GridCell>;
      })}
    </GridRow>
  );
}

//--------------------------------------------------------------------------
//
// Rows
//
//--------------------------------------------------------------------------

function _createRows(data: GridData[]): ReactNode[] {
  return data.map((data, rIndex) => {
    const cells = COLUMNS.map((c, cIndex) => {
      let label: string;
      let markerColor: string | null = null;
      if (c.field === "dayTime") {
        label = formatTotal(data.dayTime, "h:m:s");

        if (!data.isDept) {
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

      return (
        <GridCell label={label} cIndex={cIndex} markerColor={markerColor} />
      );
    });

    return (
      <GridRow
        rowClass="wt-grid-row_clickable"
        rIndex={rIndex + 1 /* header */}
        isCurrentDay={data.isCurrent}
        onClick={() => {}}
      >
        {cells}
      </GridRow>
    );
  });
}

//--------------------------------------------------------------------------
//
// Grid
//
//--------------------------------------------------------------------------

export default function DaysGrid() {
  const data = useSelector(getData);

  const headerRow = _createHeader();
  const rows = _createRows(data);
  return (
    <div className="wt-days-grid">
      {headerRow}
      {rows}
    </div>
  );
}
