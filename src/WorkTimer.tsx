import { useEffect, useState } from "react";
import AdditionalInfo from "./components/AdditionalInfo";
import Chart from "./components/Chart";
import DateLabel from "./components/DateLabel";
import Grid, { GridData } from "./components/Grid";
import ProgressBar from "./components/ProgressBar";
import Timer from "./components/Timer";
import "./css/WorkTimer.css";
import TimeController, { MonthCompletionInfo } from "./support/TimeController";
import UserActionController from "./support/UserActionController";
import { composeMonthStatusLabel } from "./utils/StatusUtil";
import {
  calcWhenStartedMessage,
  calcWhenToLeaveMessage,
} from "./utils/StartLeaveUtil";
import { updateDocumentHeader } from "./utils/DocumentUtil";
import { DayInfo } from "./utils/DayInfoUtil";

const timeController = new TimeController();
const userActionController = new UserActionController();

function WorkTimer() {
  const [statusLabel, setStatusLabel] = useState("");
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [dayTimeElapsed, setDayTimeElapsed] = useState(0);
  const [monthCompletionRatio, setMonthCompletionRatio] = useState(0);
  const [startedMessage, setStartedMessage] = useState("");
  const [whenLeaveMessage, setWhenLeaveMessage] = useState("");
  const [gridData, setGridData] = useState<GridData[]>([]);
  const [monthCompletionObject, setMonthCompletionObject] =
    useState<MonthCompletionInfo | null>(null);
  const [chartWidth, setChartWidth] = useState(100);
  const [dayInfo, setDayInfo] = useState<DayInfo | null>(null);

  function _updateDataBlocks(): void {
    setYear(timeController.getVisibleYear());
    setMonth(timeController.getVisibleMonth());

    setDayTimeElapsed(timeController.dayTimer.timeElapsed);
    setMonthCompletionRatio(
      timeController.getCurrentMonthCompletion()?.completedRatio || 0
    );
    setStartedMessage(
      calcWhenStartedMessage(timeController.getCurrentDayInfo())
    );
    setWhenLeaveMessage(
      calcWhenToLeaveMessage(timeController.dayTimer.timeElapsed)
    );
    setStatusLabel(
      composeMonthStatusLabel({
        monthCompletion: timeController.getCurrentMonthCompletion(),
        numDaysInMonth: timeController.getNumDaysInCurrentMonth(),
      })
    );
    updateDocumentHeader(
      timeController.dayTimer.isRunning,
      timeController.dayTimer.timeElapsed
    );
  }

  function _updateGrid(): void {
    setGridData(timeController.getCurrentMonthTimeList());
    setMonthCompletionObject(timeController.getCurrentMonthCompletion());
  }

  function _updateChart(): void {
    setChartWidth(document.body.clientWidth - 100);
    setDayInfo(timeController.getCurrentDayInfo());
  }

  // initialize
  useEffect(() => {
    // time controller

    timeController.fromSavedState();
    timeController.onTickFrequent = () => {
      _updateDataBlocks();
    };
    timeController.onTickRare = () => {
      _updateChart();
      _updateGrid();
    };

    // user action controller

    userActionController.onToggleTimer = () => timeController.toggleTimer();
    userActionController.start();

    _updateDataBlocks();
    _updateGrid();
    _updateChart();

    return () => {
      userActionController.stop();
    };
  }, []);

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
          onDataEdited={(data, value) => {
            data.isTotal
              ? timeController.setNewMonthTime(value, data)
              : data.isDept
              ? timeController.setNewYearDept(value, data)
              : timeController.setDayNewTime(value, data);
          }}
        />
      </div>
      <DateLabel
        year={year}
        month={month}
        onSetNewDate={(year, month) => {
          timeController.setUserYearMonth(year, month);
        }}
      />
      <div className="wt-status-label">{statusLabel}</div>
      <div className="wt-chart-container">
        <Chart width={chartWidth} dayInfo={dayInfo} />
      </div>
    </div>
  );
}

export default WorkTimer;
