import MonthPanel from "./components/MonthPanel/MonthPanel";
import TasksPanel from "./components/TasksPanel/TasksPanel";
import TimerPanel from "./components/TimerPanel/TimerPanel";
import "./css/Buttons.scss";
import "./css/Layout.scss";
import "./css/Shared.scss";
import "./css/Spacings.scss";
import "./css/WorkTimer.scss";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.scss";
import useAlerts from "./hooks/useAlerts";

function WorkTimer() {
  const alerts = useAlerts();
  return (
    <div className="wt-app">
      <TimerPanel />
      <MonthPanel />
      <TasksPanel />
      {alerts}
    </div>
  );
}

export default WorkTimer;
