import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { useTimeEditorDialog } from "../../../../features/timeEditorDialog/model/useTimeEditorDialog";
import { formatTotal } from "../../../../shared/lib";
import { Action, Button } from "../../../../shared/ui";
import DayTimer from "../../model/DayTimer";
import { timerModel } from "../../model/timerModel";
import { useShowGreetingsAlert } from "../../model/useShowGreetingsAlert";
import { HoursChart } from "../HoursChart/HoursChart";
import "./TimerPanel.scss";

function useEditDialog(time: number) {
  const dispatch = useAppDispatch();

  const { editDialog, setEditDialogShown } = useTimeEditorDialog({
    time,
    onSetTime: (time) => {
      dispatch(timerModel.actions.setTime(time));
      dispatch(timerModel.actions.postTime(time));
    },
  });

  const editTime = () => {
    dispatch(timerModel.actions.stopTimer()); // need to stop before editing
    setEditDialogShown(true);
  };

  return {
    editDialog,
    editTime,
  };
}

function useDayTimer(time: number, running: boolean) {
  const dispatch = useAppDispatch();

  const dayTimer = useMemo(() => new DayTimer(), []);
  dayTimer.onTickFrequent = () => {
    dispatch(timerModel.actions.setTime(dayTimer.time));
  };
  dayTimer.onTickRare = () => {
    dispatch(timerModel.actions.postTime(dayTimer.time));
  };

  useEffect(() => {
    if (running && !dayTimer.isRunning) {
      dayTimer.start(time);
      console.log("dayTimer.start");
    } else if (!running && dayTimer.isRunning) {
      dayTimer.stop();
      console.log("dayTimer.stop");
    }
  }, [time, running, dayTimer]);
}

export function TimerPanel() {
  const dispatch = useAppDispatch();
  const time = useAppSelector(timerModel.selectors.getTime);
  const running = useAppSelector(timerModel.selectors.isRunning);
  const { tryShow } = useShowGreetingsAlert();

  // load time from the server the first time
  useEffect(() => {
    dispatch(timerModel.actions.fetchTime());
  }, [dispatch]);

  useDayTimer(time, running);

  const _toggleTimer = () => {
    !running && tryShow();
    dispatch(timerModel.actions.toggleTimer());
  };

  const { editDialog, editTime } = useEditDialog(time);

  return (
    <div className="wt-stretched wt-flex-row wt-flex-center wt-timer-panel">
      <HoursChart />

      <div className="wt-flex-row wt-relative">
        <div className="wt-clickable wt-timer-panel-label" onClick={editTime}>
          {formatTotal(time, "h:m:s")}
        </div>
        <Action name="pencil" className="wt-m-i-start-12" onClick={editTime} />
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
