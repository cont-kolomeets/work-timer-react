import { useAppDispatch, useAppSelector } from "../../../../app/redux/hooks";
import { useAlerts } from "../../../../entities/alert";
import { get1BasedDate } from "../../../../shared/lib";
import { MonthPanel } from "../../../../widgets/monthPanel";
import { gridModel } from "../../../../widgets/monthPanel/model/gridModel";
import { TasksPanel } from "../../../../widgets/tasksPanel";
import { TimerPanel } from "../../../../widgets/timerPanel";
import { timerModel } from "../../../../widgets/timerPanel/model/timerModel";
import "./WorkTimer.scss";

export function WorkTimer() {
  const dispatch = useAppDispatch();
  const monthData = useAppSelector(gridModel.selectors.selectMonthData);
  const alerts = useAlerts();

  const _syncTimeToGrid = (time: number) => {
    dispatch(gridModel.actions.resetDate());
    if (monthData.find((data) => data.index === get1BasedDate().d)) {
      dispatch(
        gridModel.actions.updateData({ index: get1BasedDate().d, time })
      );
    } else {
      dispatch(gridModel.actions.fetchGridData());
    }
  };

  const _onGridEditStart = () => {
    dispatch(timerModel.actions.stopTimer());
  };

  const _onGridEditEnd = () => {
    dispatch(timerModel.actions.fetchTime());
  };

  return (
    <div className="wt-page">
      <TimerPanel onTimeUpdated={_syncTimeToGrid} />
      <MonthPanel onEditStart={_onGridEditStart} onEditEnd={_onGridEditEnd} />
      <TasksPanel />
      {alerts}
    </div>
  );
}
