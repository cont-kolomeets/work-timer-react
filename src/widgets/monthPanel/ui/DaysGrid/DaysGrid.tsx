import { ReactNode, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { useDateEditorDialog } from "../../../../features/timeEditorDialog/model/useDateEditorDialog";
import { useTimeEditorDialog } from "../../../../features/timeEditorDialog/model/useTimeEditorDialog";
import { formatTotal, get1BasedDate } from "../../../../shared/lib";
import { Action, Loader } from "../../../../shared/ui";
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

function _useEditTimeDialog() {
  const dispatch = useAppDispatch();
  const [editedData, setEditedData] = useState<GridDayData | null>(null);

  const { editDialog, setEditDialogShown } = useTimeEditorDialog({
    time: editedData?.time || 0,
    onSetTime: (time) => {
      if (editedData) {
        const newData = { ...editedData };
        newData.time = time;
        dispatch(gridModel.actions.updateData(newData));
        dispatch(gridModel.actions.postGridData(newData));
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

function _useEditDeptDialog() {
  const dispatch = useAppDispatch();
  const [editedDept, setEditedDept] = useState(0);

  const { editDialog, setEditDialogShown } = useTimeEditorDialog({
    time: editedDept,
    onSetTime: (time) => {
      dispatch(gridModel.actions.updateDept(time));
      dispatch(gridModel.actions.postDept(time));
    },
  });

  return {
    editDialog,
    editDept: (dept: number) => {
      setEditedDept(dept);
      setEditDialogShown(true);
    },
  };
}

function _useEditDateDialog() {
  const dispatch = useAppDispatch();
  const [editedDate, setEditedDate] = useState({ year: 0, month: 0 });

  const { editDialog, setEditDialogShown } = useDateEditorDialog({
    year: editedDate.year,
    month: editedDate.month,
    onSetDate: (year, month) => {
      dispatch(gridModel.actions.setDate({ year, month }));
    },
  });

  return {
    editDialog,
    editDate: (year: number, month: number) => {
      setEditedDate({ year, month });
      setEditDialogShown(true);
    },
  };
}

export function DaysGrid() {
  const loadingStatus = useAppSelector(gridModel.selectors.getLoaingStatus);
  const monthData = useAppSelector(gridModel.selectors.selectMonthData);
  const dept = useAppSelector(gridModel.selectors.selectDept);
  const year = useAppSelector(gridModel.selectors.getYear);
  const month = useAppSelector(gridModel.selectors.getMonth);
  const { editDialog: editTimeDialog, editData } = _useEditTimeDialog();
  const { editDialog: editDeptDialog, editDept } = _useEditDeptDialog();
  const { editDialog: editDateDialog, editDate } = _useEditDateDialog();

  if (loadingStatus === "loading") {
    return <Loader />;
  }

  const headerRow = _createHeader();
  const rows = _createRows({
    data: monthData,
    dept,
    onEditTime: editData,
    onEditDept: () => editDept(dept),
  });
  return (
    <div className="wt-days-grid">
      <div
        className="wt-flex-row wt-m-b-end-12 wt-clickable wt-days-grid__date"
        onClick={() => {
          editDate(year, month);
        }}
      >
        <div>{`${year}.${month}`}</div>
        <Action name="pencil" size="16" className="wt-m-i-start-12" />
      </div>
      {headerRow}
      {rows}
      {editTimeDialog}
      {editDeptDialog}
      {editDateDialog}
    </div>
  );
}
