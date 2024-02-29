import { DateToolbar } from "../../../../entities/dateToolbar";
import { useGridToolbar } from "../../model/useGridToolbar";
import "./GridToolbar.scss";

export function GridToolbar({ onEditStart }: { onEditStart(): void }) {
  const { year, month, editDateDialog, changeMonth, editDate } =
    useGridToolbar(onEditStart);

  return (
    <div>
      <DateToolbar
        year={year}
        month={month}
        onClickDate={() => editDate(year, month)}
        actionsLeft={[
          {
            icon: "chevron-left",
            onClick: () => changeMonth(year, month, "prev"),
          },
        ]}
        actionsRight={[
          {
            icon: "pencil",
            onClick: () => {
              editDate(year, month);
            },
          },
          {
            icon: "arrow-clockwise",
            onClick: () => changeMonth(year, month, "reset"),
          },
          {
            icon: "chevron-right",
            onClick: () => changeMonth(year, month, "next"),
          },
        ]}
      />
      {editDateDialog}
    </div>
  );
}
