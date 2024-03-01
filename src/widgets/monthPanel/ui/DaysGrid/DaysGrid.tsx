import { ReactNode } from "react";
import {
  formatTotal,
  get1BasedDate,
  isHoliday,
  isWeekend,
} from "../../../../shared/lib";
import { Loader } from "../../../../shared/ui";
import { GridDayData } from "../../model/interfaces";
import { useDaysGrid } from "../../model/useDaysGrid";
import { GridCell } from "../GridCell/GridCell";
import { GridRow } from "../GridRow/GridRow";
import { GridToolbar } from "../GridToolbar/GridToolbar";
import "./DaysGrid.scss";

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

const _8h = 8 * 3600000;
const _10h = 10 * 3600000;

//--------------------------------------------------------------------------
//
// Header
//
//--------------------------------------------------------------------------

function _createHeader(): ReactNode {
  return (
    <GridRow key={0} isHeader={true}>
      {COLUMNS.map((c, cIndex) => {
        return (
          <GridCell
            key={c.label}
            label={c.label}
            cIndex={cIndex}
            isHeader={true}
          ></GridCell>
        );
      })}
    </GridRow>
  );
}

//--------------------------------------------------------------------------
//
// Rows
//
//--------------------------------------------------------------------------

function _createRows({
  year,
  month,
  data,
  dept,
  onEditTime,
  onEditDept,
}: {
  year: number;
  month: number;
  data: GridDayData[];
  dept: number;
  onEditTime(data: GridDayData): void;
  onEditDept(): void;
}): ReactNode[] {
  let total = 0;
  let totalExpected = 0;

  const dataRows = data.map((data, rIndex) => {
    const today = get1BasedDate();
    const isNonWorkingDay =
      isWeekend(year, month, data.index) || isHoliday(month, data.index);
    total += data.time;
    !isNonWorkingDay && (totalExpected += _8h);

    const cells = COLUMNS.map((c, cIndex) => {
      let label: string;
      let markerColor: string | null = null;
      if (c.field === "dayTime") {
        label = formatTotal(data.time, "h:m");
        if (data.time && !isNonWorkingDay) {
          markerColor =
            data.time < _8h ? "darkred" : data.time > _10h ? "yellow" : "green";
        }
      } else {
        label = data.index + "";
      }

      return (
        <GridCell
          key={data.index + "-" + cIndex}
          label={label}
          cIndex={cIndex}
          isHeader={false}
          markerColor={markerColor}
          onEditTime={() => {
            onEditTime(data);
          }}
        />
      );
    });

    return (
      <GridRow
        key={rIndex + 1 /* header */}
        isCurrentDay={
          today.y === year && today.m === month && data.index === today.d
        }
        isNonWorkingDay={isNonWorkingDay}
      >
        {cells}
      </GridRow>
    );
  });

  // total

  const totalCells = COLUMNS.map((c, cIndex) => {
    let label: string;
    if (c.field === "dayTime") {
      label = `${formatTotal(total, "h:m")} of ${formatTotal(
        totalExpected,
        "h:m"
      )}`;
    } else {
      label = "Total";
    }
    return (
      <GridCell
        key={"total-" + cIndex}
        label={label}
        cIndex={cIndex}
        isHeader={false}
      />
    );
  });
  dataRows.push(<GridRow key="total">{totalCells}</GridRow>);

  // dept

  const deptCells = COLUMNS.map((c, cIndex) => {
    let label: string;
    if (c.field === "dayTime") {
      label = formatTotal(dept, "h:m");
    } else {
      label = "Dept";
    }
    return (
      <GridCell
        key={"dept-" + cIndex}
        label={label}
        cIndex={cIndex}
        isHeader={false}
        onEditTime={() => {
          onEditDept();
        }}
      />
    );
  });
  dataRows.push(<GridRow key="dept">{deptCells}</GridRow>);

  return dataRows;
}

//--------------------------------------------------------------------------
//
// Grid
//
//--------------------------------------------------------------------------

type EditStartEndProps = EditStartProps & {
  onEditEnd(): void;
};

type EditStartProps = {
  onEditStart(): void;
};

export function DaysGrid({ onEditStart, onEditEnd }: EditStartEndProps) {
  const {
    loadingStatus,
    year,
    month,
    monthData,
    dept,
    editData,
    editDept,
    editTimeDialog,
    editDeptDialog,
  } = useDaysGrid({ onEditStart, onEditEnd });

  if (loadingStatus === "loading") {
    return <Loader />;
  }

  const headerRow = _createHeader();
  const rows = _createRows({
    year,
    month,
    data: monthData,
    dept,
    onEditTime: editData,
    onEditDept: () => editDept(dept),
  });
  return (
    <div className="wt-days-grid">
      <GridToolbar onEditStart={onEditStart} />
      {headerRow}
      {rows}
      {editTimeDialog}
      {editDeptDialog}
    </div>
  );
}
