import { useAppSelector } from "../../../../app/redux/hooks";
import { DateToolbar } from "../../../../entities/dateToolbar";
import { tasksModel } from "../../model/tasksModel";
import { useTasksToolbar } from "../../model/useTasksToolbar";
import "./TasksToolbar.scss";

export function TasksToolbar() {
  const tasks = useAppSelector(tasksModel.selectors.selectAllTasks);
  const {
    year,
    month,
    loading,
    editTaskDialog,
    addNewTask,
    createReportDay,
    createReportMonth,
    editDate,
    changeMonth,
    editDateDialog,
  } = useTasksToolbar();

  return (
    <div className="wt-m-b-start-4 wt-m-b-end-20">
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
            icon: "plus-lg",
            onClick: addNewTask,
          },
          {
            icon: "calendar-day",
            disabled: !tasks.length,
            loading: loading,
            onClick: createReportDay,
          },
          {
            icon: "calendar-month",
            disabled: !tasks.length,
            loading: loading,
            onClick: createReportMonth,
          },
          {
            icon: "chevron-right",
            onClick: () => changeMonth(year, month, "next"),
          },
        ]}
      />
      {editTaskDialog}
      {editDateDialog}
    </div>
  );
}
