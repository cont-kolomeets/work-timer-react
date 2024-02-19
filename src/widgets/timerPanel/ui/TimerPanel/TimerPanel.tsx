import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { useTimeEditorDialog } from "../../../../features/timeEditorDialog/model/useTimeEditorDialog";
import { formatTotal } from "../../../../shared/lib";
import { Action, Button } from "../../../../shared/ui";
import { timerModel } from "../../model/timerModel";
import { useShowGreetingsAlert } from "../../model/useShowGreetingsAlert";
import { HoursChart } from "../HoursChart/HoursChart";
import "./TimerPanel.scss";

export function TimerPanel() {
  const time = useAppSelector(timerModel.selectors.getTime);
  const running = useAppSelector(timerModel.selectors.isRunning);
  const dispatch = useAppDispatch();
  const { tryShow } = useShowGreetingsAlert();

  const _toggleTimer = () => {
    !running && tryShow();
    dispatch(timerModel.actions.toggleTimer());
  };

  const { editDialog, setEditDialogShown } = useTimeEditorDialog({
    time,
    onSetTime: (time) => {
      dispatch(timerModel.actions.setTime(time));
    },
  });

  const _editTime = () => {
    dispatch(timerModel.actions.stopTimer()); // need to stop before editing
    setEditDialogShown(true);
  };

  useEffect(() => {
    function _toggleTimer(event: KeyboardEvent) {
      event.key === " " && workTimerModel.toggleTimer();
    }
    document.body.addEventListener("keyup", _toggleTimer);
    return () => document.body.removeEventListener("keyup", _toggleTimer);
  }, []);

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
