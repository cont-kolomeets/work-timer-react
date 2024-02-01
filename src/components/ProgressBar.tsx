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
    <div className="progressBarHolder">
      <div className="dayProgressBarContainer">
        <div
          className="dayProgressBarCompleted"
          style={{ width: dayProgressWidth }}
        ></div>
      </div>
      <br />
      <div className="progressBarContainer">
        <div
          className="progressBarCompleted"
          style={{ width: monthProgressWidth }}
        ></div>
        <div className="progressBarLabel">{monthProgressLabel}</div>
      </div>
    </div>
  );
}

export default ProgressBar;
