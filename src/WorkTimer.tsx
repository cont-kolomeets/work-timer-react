import AdditionalInfo from "./components/AdditionalInfo";
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
      <Timer />
      <ProgressBar />
      <AdditionalInfo />
      <div className="computerImage" id="computerImage"></div>
      <div className="gridDiv" id="gridDiv"></div>
      <div className="dateLabel" id="dateLabel"></div>
      <div className="statusLabel" id="statusLabel"></div>
      <div className="chartDiv" id="chartDiv"></div>
    </div>
  );
}

export default WorkTimer;
