import "../../css/TimerPanel.scss";
import { useSelector } from "react-redux";
import { getTime } from "./timerSlice";

function TimerPanel() {
  const formattedTime = useSelector(getTime) + "";
  return (
    <div className="wt-stretched wt-flex-row wt-flex-center wt-timer-panel">
      <div className="wt-timer-panel-label">{formattedTime}</div>
    </div>
  );
}

export default TimerPanel;
