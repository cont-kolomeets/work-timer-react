function ProgressBar() {
  return (
    <div className="progressBarHolder">
      <div className="dayProgressBarContainer" id="dayProgressBarContainer">
        <div className="dayProgressBarCompleted" id="dayProgressBarCompleted"></div>
      </div>
      <br />
      <div className="progressBarContainer" id="progressBarContainer">
        <div className="progressBarCompleted" id="progressBarCompleted"></div>
        <div className="progressBarLabel" id="progressBarLabel"></div>
      </div>
    </div>
  );
}

export default ProgressBar;
