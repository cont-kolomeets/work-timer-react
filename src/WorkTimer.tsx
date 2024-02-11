import TimerPanel from "./components/timer/TimerPanel";
import "./css/Buttons.scss";
import "./css/Layout.scss";
import "./css/WorkTimer.scss";

function WorkTimer() {
  return (
    <div className="wt-app">
      <TimerPanel />
    </div>
  );
}

export default WorkTimer;
