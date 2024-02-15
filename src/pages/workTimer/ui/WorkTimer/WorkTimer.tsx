import { useAlerts } from "../../../../entities/alert";
import { MonthPanel } from "../../../../widgets/monthPanel";
import { TasksPanel } from "../../../../widgets/tasksPanel";
import { TimerPanel } from "../../../../widgets/timerPanel";
import { timeModel } from "../../model/TimeModel";
import "./css/WorkTimer.scss";

timeModel.initialize();

export function WorkTimer() {
  const alerts = useAlerts();
  return (
    <div className="wt-page">
      <TimerPanel />
      <MonthPanel />
      <TasksPanel />
      {alerts}
    </div>
  );
}
