import { MonthPanel } from "../../../../widgets/monthPanel";
import { TasksPanel } from "../../../../widgets/tasksPanel";
import { TimerPanel } from "../../../../widgets/timerPanel";
import { useWorkTimer } from "../../model/useWorkTimer";
import "./WorkTimer.scss";

export function WorkTimer() {
  const { syncTimeToGrid, onGridEditStart, onGridEditEnd, alerts } =
    useWorkTimer();

  return (
    <div className="wt-stretched wt-page">
      <TimerPanel onTimeUpdated={syncTimeToGrid} />
      <MonthPanel onEditStart={onGridEditStart} onEditEnd={onGridEditEnd} />
      <TasksPanel />
      {alerts}
    </div>
  );
}
