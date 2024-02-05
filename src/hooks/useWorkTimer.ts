import TimeController, { MonthCompletionInfo } from "./support/TimeController";
import UserActionController from "./support/UserActionController";
import { composeMonthStatusLabel } from "./utils/StatusUtil";
import {
  calcWhenStartedMessage,
  calcWhenToLeaveMessage,
} from "./utils/StartLeaveUtil";
import { updateDocumentHeader } from "./utils/DocumentUtil";
import { DayInfo } from "./utils/DayInfoUtil";
import { useEffect, useState, useMemo } from "react";
import { GridData } from "../components/Grid";

export default function useWorkTimer(): {
  statusLabel: string;
  year: number;
  month: number;
  dayTimeElapsed: number;
  monthCompletionRatio: number;
  startedMessage: string;
  whenLeaveMessage: string;
  gridData: GridData[];
  monthCompletionObject: MonthCompletionInfo | null;
  chartWidth: number;
  dayInfo: DayInfo | null;
  editData(data: GridData, value: string): void;
  setNewDate(year: number, month: number): void;
} {
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

  // reusable model classes
  const timeController = useMemo(() => new TimeController(), []);
  const userActionController = useMemo(() => new UserActionController(), []);

  function _updateDataBlocks(): void {
    console.log("_updateDataBlocks");
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
    console.log("_updateGrid");
    setGridData(timeController.getCurrentMonthTimeList());
    setMonthCompletionObject(timeController.getCurrentMonthCompletion());
  }

  function _updateChart(): void {
    console.log("_updateChart");
    setChartWidth(document.body.clientWidth - 100);
    setDayInfo(timeController.getCurrentDayInfo());
  }

  function editData(data: GridData, value: string): void {
    console.log("editData");
    data.isTotal
      ? timeController.setNewMonthTime(value, data)
      : data.isDept
      ? timeController.setNewYearDept(value, data)
      : timeController.setDayNewTime(value, data);
  }

  function setNewDate(year: number, month: number): void {
    console.log("setNewDate");
    timeController.setUserYearMonth(year, month);
  }

  // initialize
  useEffect(() => {
    console.log("initialize");

    // time controller

    timeController.fromSavedState();
    timeController.onTickFrequent = () => _updateDataBlocks();
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

  return {
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
  };
}
