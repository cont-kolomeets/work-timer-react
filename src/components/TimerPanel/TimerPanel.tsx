import "./TimerPanel.scss";
import { useSelector, useDispatch } from "react-redux";
import { getTime, isRunning, toggleTimer } from "./store/timerSlice";
import { formatTotal } from "../../utils/TimeConvertUtil";
import HoursChart from "./HoursChart";
import showGreetingsAlert from "./store/showGreetingsAlert";

function TimerPanel() {
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

export default TimerPanel;
