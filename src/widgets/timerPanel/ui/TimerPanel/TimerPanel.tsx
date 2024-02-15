import { useDispatch, useSelector } from "react-redux";
import { formatTotal } from "../../../../shared/lib";
import { showGreetingsAlert } from "../../model/showGreetingsAlert";
import { getTime, isRunning, toggleTimer } from "../../model/timerSlice";
import { HoursChart } from "../HoursChart/HoursChart";
import "./TimerPanel.scss";

export function TimerPanel() {
  const formattedTime = formatTotal(useSelector(getTime), "h:m:s");
  const running = useSelector(isRunning);
  const dispatch = useDispatch();

  const _toggleTimer = () => {
    !running && showGreetingsAlert();
    dispatch(toggleTimer());
  };

  return (
    <div className="wt-stretched wt-flex-row wt-flex-center wt-timer-panel">
      <HoursChart />

      <div className="wt-timer-panel-label">{formattedTime}</div>
      <div className="wt-flex-row wt-flex-center wt-timer-bottom-container">
        <button
          className="wt-round-button wt-timer-toggle-button"
          onClick={_toggleTimer}
        >
          {running ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
}
