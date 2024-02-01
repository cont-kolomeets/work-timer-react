import AdditionalInfo from "./components/AdditionalInfo";
import Chart from "./components/Chart";
import DateLabel from "./components/DateLabel";
import Grid from "./components/Grid";
import ProgressBar from "./components/ProgressBar";
import Timer from "./components/Timer";
import "./css/WorkTimer.css";

function WorkTimer() {
  // var storageItem = localStorage.getItem("workTimer.yearsItem");
  // TimeController.fromJson(storageItem ? JSON.parse(storageItem) : defaultItem);
  // UserActionController.start();
  // DayTimer.setElapsedTime(TimeController.getCurrentDayInfo().elapsed);
  // DateLabel.update();
  // Grid.refresh();
  // Chart.update();
  // StatusController.update();

  return (
    <div className="workTimerApp">
      <div className="computerImage"></div>
      <Timer />
      <ProgressBar />
      <AdditionalInfo />
      <div className="gridDiv">
        <Grid />
      </div>
      <DateLabel />
      <div className="statusLabel" id="statusLabel"></div>
      <div className="chartDiv">
        <Chart />
      </div>
    </div>
  );
}

export default WorkTimer;
