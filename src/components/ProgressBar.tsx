import "../css/ProgressBar.css";

type ProgressBarProps = {
  dayTimeElapsed: number;
  monthCompletionRatio: number;
};

function ProgressBar({
  dayTimeElapsed,
  monthCompletionRatio,
}: ProgressBarProps) {
  // day completion
  const dayProgressWidth =
    Math.min(100, (dayTimeElapsed / (8 * 3.6e6)) * 100) + "%";

  // month completion
  const monthProgressWidth = Math.min(100, monthCompletionRatio * 100) + "%";
  const monthProgressLabel = (monthCompletionRatio * 100).toFixed(2) + "%";

  return (
    <div className="wt-progress-bar">
      <div className="wt-progress-bar__day-container">
        <div
          className="wt-progress-bar__day-completed"
          style={{ width: dayProgressWidth }}
        ></div>
      </div>
      <br />
      <div className="wt-progress-bar__container">
        <div
          className="wt-progress-bar__completed"
          style={{ width: monthProgressWidth }}
        ></div>
        <div className="wt-progress-bar__label">{monthProgressLabel}</div>
      </div>
    </div>
  );
}

export default ProgressBar;
