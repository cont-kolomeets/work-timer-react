import { formatTotal } from "../utils/TimeConvertUtil";

type TimerProps = {
  timeElapsed: number;
};

function Timer({ timeElapsed }: TimerProps) {
  const hoursLabel = formatTotal(timeElapsed, "h") + ":";
  const restLabel = formatTotal(timeElapsed, "m:s:ms10");
  return (
    <div className="timerDiv">
      <div className="timerDivH">{hoursLabel}</div>
      <div className="timerDivRest">{restLabel}</div>
    </div>
  );
}

export default Timer;
