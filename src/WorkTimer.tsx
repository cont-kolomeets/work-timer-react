import MonthPanel from "./components/month/MonthPanel";
import TasksPanel from "./components/tasks/TasksPanel";
import TimerPanel from "./components/timer/TimerPanel";
import "./css/Buttons.scss";
import "./css/Layout.scss";
import "./css/Spacings.scss";
import "./css/WorkTimer.scss";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.scss";

function WorkTimer() {
  return (
    <div className="wt-app">
      <TimerPanel />
      <MonthPanel />
      <TasksPanel />
    </div>
  );
}

export default WorkTimer;
