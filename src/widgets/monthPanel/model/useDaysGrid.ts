import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/redux/hooks";
import { useTimeEditorDialog } from "../../../features/timeEditorDialog/model/useTimeEditorDialog";
import { gridModel } from "./gridModel";
import { GridDayData } from "./interfaces";

type EditStartEndProps = EditStartProps & {
  onEditEnd(): void;
};

type EditStartProps = {
  onEditStart(): void;
};

function _useEditTimeDialog({ onEditStart, onEditEnd }: EditStartEndProps) {
  const dispatch = useAppDispatch();
  const [editedData, setEditedData] = useState<GridDayData | null>(null);

  const { editDialog, setEditDialogShown } = useTimeEditorDialog({
    time: editedData?.time || 0,
    onSetTime: async (time) => {
      if (editedData) {
        const newData = { ...editedData };
        newData.time = time;
        dispatch(gridModel.actions.updateData(newData));
        await dispatch(gridModel.actions.postGridData(newData));
        onEditEnd();
      }
    },
  });

  return {
    editDialog,
    editData: (data: GridDayData) => {
      setEditedData(data);
      onEditStart();
      setEditDialogShown(true);
    },
  };
}

function _useEditDeptDialog({ onEditStart }: EditStartProps) {
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
      onEditStart();
      setEditedDept(dept);
      setEditDialogShown(true);
    },
  };
}

export function useDaysGrid({ onEditStart, onEditEnd }: EditStartEndProps) {
  const year = useAppSelector(gridModel.selectors.getYear);
  const month = useAppSelector(gridModel.selectors.getMonth);
  const loadingStatus = useAppSelector(gridModel.selectors.getLoaingStatus);
  const monthData = useAppSelector(gridModel.selectors.selectMonthData);
  const dept = useAppSelector(gridModel.selectors.selectDept);

  const { editDialog: editTimeDialog, editData } = _useEditTimeDialog({
    onEditStart,
    onEditEnd,
  });
  const { editDialog: editDeptDialog, editDept } = _useEditDeptDialog({
    onEditStart,
  });

  return {
    loadingStatus,
    year,
    month,
    monthData,
    dept,
    editData,
    editDept,
    editTimeDialog,
    editDeptDialog,
  };
}
