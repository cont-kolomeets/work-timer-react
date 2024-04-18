import { Loader } from "../../../../shared/ui";
import { MonthPanel } from "../../../../widgets/monthPanel";
import { TasksPanel } from "../../../../widgets/tasksPanel";
import { TimerPanel } from "../../../../widgets/timerPanel";
import { UserPanel } from "../../../../widgets/userPanel";
import { useWorkTimer } from "../../model/useWorkTimer";
import "./WorkTimer.scss";

export function WorkTimer() {
  const { userState, syncTimeToGrid, onGridEditStart, onGridEditEnd, alerts } =
    useWorkTimer();

  if (userState === "loading") {
    return <Loader />;
  }

  return (
    <div className="wt-stretched wt-page">
      <div className="wt-stretched wt-timer-bg"></div>
      {userState === "logged-in" ? (
        <>
          <TimerPanel onTimeUpdated={syncTimeToGrid} />
          <MonthPanel onEditStart={onGridEditStart} onEditEnd={onGridEditEnd} />
          <TasksPanel />
        </>
      ) : null}
      {userState !== "initial" ? <UserPanel /> : null}
      {alerts}
    </div>
  );
}
