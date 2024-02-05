import AdditionalInfo from "./components/AdditionalInfo";
import Chart from "./components/Chart";
import DateLabel from "./components/DateLabel";
import Grid from "./components/Grid";
import ProgressBar from "./components/ProgressBar";
import Timer from "./components/Timer";
import "./css/WorkTimer.css";
import useWorkTimer from "./hooks/useWorkTimer";

function WorkTimer() {
  const {
    statusLabel,
    year,
    month,
    dayTimeElapsed,
    monthCompletionRatio,
    startedMessage,
    whenLeaveMessage,
    gridData,
    monthCompletionObject,
    chartWidth,
    dayInfo,
    editData,
    setNewDate,
  } = useWorkTimer();

  return (
    <div className="wt-app">
      <div className="wt-logo-image"></div>
      <Timer timeElapsed={dayTimeElapsed} />
      <ProgressBar
        dayTimeElapsed={dayTimeElapsed}
        monthCompletionRatio={monthCompletionRatio}
      />
      <AdditionalInfo
        startedMessage={startedMessage}
        whenLeaveMessage={whenLeaveMessage}
      />
      <div className="wt-grid-container">
        <Grid
          data={gridData}
          monthCompletionObject={monthCompletionObject}
          onDataEdited={editData}
        />
      </div>
      <DateLabel year={year} month={month} onSetNewDate={setNewDate} />
      <div className="wt-status-label" style={{ display: "none" }}>
        {statusLabel}
      </div>
      <div className="wt-chart-container">
        <Chart width={chartWidth} dayInfo={dayInfo} />
      </div>
    </div>
  );
}

export default WorkTimer;
