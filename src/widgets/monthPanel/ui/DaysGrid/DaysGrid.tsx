import { ReactNode, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { useTimeEditorDialog } from "../../../../features/timeEditorDialog/model/useTimeEditorDialog";
import { formatTotal, get1BasedDate } from "../../../../shared/lib";
import { Loader } from "../../../../shared/ui";
import { gridModel } from "../../model/gridModel";
import { GridDayData } from "../../model/interfaces";
import { GridCell } from "../GridCell/GridCell";
import { GridRow } from "../GridRow/GridRow";
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
  data,
  dept,
  onEditTime,
  onEditDept,
}: {
  data: GridDayData[];
  dept: number;
  onEditTime(data: GridDayData): void;
  onEditDept(): void;
}): ReactNode[] {
  const dataRows = data.map((data, rIndex) => {
    const cells = COLUMNS.map((c, cIndex) => {
      let label: string;
      let markerColor: string | null = null;
      if (c.field === "dayTime") {
        label = formatTotal(data.time, "h:m:s");

        if (data.index === -1) {
          let _8h = 8 * 3600000;
          let _10h = 10 * 3600000;
          markerColor =
            data.time < _8h ? "red" : data.time > _10h ? "yellow" : "#7fff00";
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
        isCurrentDay={data.index === get1BasedDate().d}
      >
        {cells}
      </GridRow>
    );
  });

  // dept

  const cells = COLUMNS.map((c, cIndex) => {
    let label: string;
    if (c.field === "dayTime") {
      label = formatTotal(dept, "h:m:s");
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
  dataRows.push(<GridRow key="dept">{cells}</GridRow>);

  return dataRows;
}

//--------------------------------------------------------------------------
//
// Grid
//
//--------------------------------------------------------------------------

function useEditDialog() {
  const dispatch = useAppDispatch();
  const [editedData, setEditedData] = useState<GridDayData | null>(null);

  const { editDialog, setEditDialogShown } = useTimeEditorDialog({
    time: editedData?.time || 0,
    onSetTime: (time) => {
      if (editedData) {
        const newData = { ...editedData };
        newData.time = time;
        dispatch(gridModel.actions.editGridData(newData));
      }
    },
  });

  return {
    editDialog,
    editData: (data: GridDayData) => {
      setEditedData(data);
      setEditDialogShown(true);
    },
  };
}

export function DaysGrid() {
  const loadingStatus = useAppSelector(gridModel.selectors.getLoaingStatus);
  const monthData = useAppSelector(gridModel.selectors.selectMonthData);
  const dept = useAppSelector(gridModel.selectors.selectDept);
  const { editDialog, editData } = useEditDialog();

  if (loadingStatus === "loading") {
    return <Loader />;
  }

  const headerRow = _createHeader();
  const rows = _createRows({
    data: monthData,
    dept,
    onEditTime: editData,
    onEditDept: () => {},
  });
  return (
    <div className="wt-days-grid">
      {headerRow}
      {rows}
      {editDialog}
    </div>
  );
}
