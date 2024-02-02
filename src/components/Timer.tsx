import { formatTotal } from "../utils/TimeConvertUtil";
import "../css/Timer.css";

type TimerProps = {
  timeElapsed: number;
};

function Timer({ timeElapsed }: TimerProps) {
  const hoursLabel = formatTotal(timeElapsed, "h") + ":";
  const restLabel = formatTotal(timeElapsed, "m:s:ms10");
  return (
    <div className="wt-timer">
      <div className="wt-timer__hours">{hoursLabel}</div>
      <div className="wt-timer__rest">{restLabel}</div>
    </div>
  );
}

export default Timer;
