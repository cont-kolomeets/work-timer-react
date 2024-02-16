import { ReactNode, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTimeEditorDialog } from "../../../../features/timeEditorDialog/model/useTimeEditorDialog";
import { formatTotal } from "../../../../shared/lib";
import { getMonthData, updateDayData } from "../../model/gridSlice";
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

function _createRows(
  data: GridDayData[],
  onEditTime: (data: GridDayData) => void
): ReactNode[] {
  return data.map((data, rIndex) => {
    const cells = COLUMNS.map((c, cIndex) => {
      let label: string;
      let markerColor: string | null = null;
      if (c.field === "dayTime") {
        label = formatTotal(data.time, "h:m:s");

        if (!data.isDept) {
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
          key={label}
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

export function DaysGrid() {
  const monthData = useSelector(getMonthData);
  const [editedData, setEditedData] = useState<GridDayData | null>(null);
  const dispatch = useDispatch();

  const { editDialog, setEditDialogShown } = useTimeEditorDialog({
    time: editedData?.time || 0,
    onSetTime: (time) => {
      if (editedData) {
        const newData = { ...editedData };
        newData.time = time;
        dispatch(updateDayData(newData));
      }
    },
  });

  const headerRow = _createHeader();
  const rows = _createRows(monthData, (data) => {
    setEditedData(data);
    setEditDialogShown(true);
  });
  return (
    <div className="wt-days-grid">
      {headerRow}
      {rows}
      {editDialog}
    </div>
  );
}
