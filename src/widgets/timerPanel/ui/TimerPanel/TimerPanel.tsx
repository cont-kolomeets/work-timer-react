import { useDispatch, useSelector } from "react-redux";
import { useTimeEditorDialog } from "../../../../features/timeEditorDialog/model/useTimeEditorDialog";
import { formatTotal } from "../../../../shared/lib";
import { Action, Button } from "../../../../shared/ui";
import { showGreetingsAlert } from "../../model/showGreetingsAlert";
import {
  getTime,
  isRunning,
  setTime,
  stopTimer,
  toggleTimer,
} from "../../model/timerSlice";
import { HoursChart } from "../HoursChart/HoursChart";
import "./TimerPanel.scss";

export function TimerPanel() {
  const time = useSelector(getTime);
  const running = useSelector(isRunning);
  const dispatch = useDispatch();

  const _toggleTimer = () => {
    !running && showGreetingsAlert();
    dispatch(toggleTimer());
  };

  const _saveTime = (time: number) => {
    dispatch(setTime(time));
  };

  const { editDialog, setEditDialogShown } = useTimeEditorDialog({
    time,
    onSetTime: _saveTime,
  });

  const _editTime = () => {
    dispatch(stopTimer()); // need to stop before editing
    setEditDialogShown(true);
  };

  return (
    <div className="wt-stretched wt-flex-row wt-flex-center wt-timer-panel">
      <HoursChart />

      <div className="wt-flex-row wt-relative">
        <div className="wt-clickable wt-timer-panel-label" onClick={_editTime}>
          {formatTotal(time, "h:m:s")}
        </div>
        <Action name="pencil" className="wt-m-i-start-12" onClick={_editTime} />
      </div>
      <div className="wt-flex-row wt-flex-center wt-timer-bottom-container">
        <Button
          className="wt-round-button wt-timer-toggle-button"
          onClick={_toggleTimer}
        >
          {running ? "Stop" : "Start"}
        </Button>
      </div>

      {editDialog}
    </div>
  );
}
