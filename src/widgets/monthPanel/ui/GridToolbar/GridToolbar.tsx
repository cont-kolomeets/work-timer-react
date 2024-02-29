import { format2digit } from "../../../../shared/lib";
import { Action } from "../../../../shared/ui";
import { useGridToolbar } from "../../model/useGridToolbar";
import "./GridToolbar.scss";

export function GridToolbar({ onEditStart }: { onEditStart(): void }) {
  const { year, month, editDateDialog, changeMonth, editDate } =
    useGridToolbar(onEditStart);

  return (
    <div className="wt-flex-row wt-m-b-end-12 wt-clickable wt-days-grid__date">
      <Action
        name="chevron-left"
        size="16"
        className="wt-m-i-start-12"
        onClick={() => changeMonth(year, month, "prev")}
      />
      <div
        className=" wt-flex-row wt-flex-center wt-flex-spacer"
        onClick={() => editDate(year, month)}
      >{`${year}.${format2digit(month)}`}</div>
      <Action
        name="pencil"
        size="16"
        className="wt-m-i-start-12"
        onClick={() => editDate(year, month)}
      />
      <Action
        name="arrow-clockwise"
        size="16"
        className="wt-m-i-start-12"
        onClick={() => changeMonth(year, month, "reset")}
      />
      <Action
        name="chevron-right"
        size="16"
        className="wt-m-i-start-12"
        onClick={() => changeMonth(year, month, "next")}
      />
      {editDateDialog}
    </div>
  );
}
