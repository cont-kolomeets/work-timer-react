import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { useTimeEditorDialog } from "../../../../features/timeEditorDialog/model/useTimeEditorDialog";
import { formatTotal } from "../../../../shared/lib";
import { useOnDocumentKeyUp } from "../../../../shared/model";
import { Action, Button, Loader } from "../../../../shared/ui";
import DayTimer from "../../model/DayTimer";
import { timerModel } from "../../model/timerModel";
import { useShowGreetingsAlert } from "../../model/useShowGreetingsAlert";
import { HoursChart } from "../HoursChart/HoursChart";
import "./TimerPanel.scss";

function _useEditDialog(time: number, onTimeUpdated: (time: number) => void) {
  const dispatch = useAppDispatch();

  const { editDialog, setEditDialogShown } = useTimeEditorDialog({
    time,
    onSetTime: async (time) => {
      dispatch(timerModel.actions.setTime(time));
      await dispatch(timerModel.actions.postTime(time));
      onTimeUpdated(time);
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

function _useDayTimer(
  time: number,
  running: boolean,
  onTimeUpdated: (time: number) => void
) {
  const dispatch = useAppDispatch();

  const dayTimer = useRef(new DayTimer());
  dayTimer.current.onTickFrequent = () => {
    dispatch(timerModel.actions.setTime(dayTimer.current.time));
  };
  dayTimer.current.onTickRare = async () => {
    await dispatch(timerModel.actions.postTime(time));
    onTimeUpdated(time);
  };

  useEffect(() => {
    if (running && !dayTimer.current.isRunning) {
      dayTimer.current.start(time);
      console.log("dayTimer.start");
    } else if (!running && dayTimer.current.isRunning) {
      dayTimer.current.stop();
      console.log("dayTimer.stop");
    }
  }, [time, running, dayTimer]);
}

export function TimerPanel({
  onTimeUpdated,
}: {
  onTimeUpdated(time: number): void;
}) {
  const dispatch = useAppDispatch();
  const time = useAppSelector(timerModel.selectors.getTime);
  const running = useAppSelector(timerModel.selectors.isRunning);
  const loadingStatus = useAppSelector(timerModel.selectors.getLoadingStatus);
  const { showGreetings } = useShowGreetingsAlert();

  // load time from the server the first time
  useEffect(() => {
    dispatch(timerModel.actions.fetchTime());
  }, [dispatch]);

  _useDayTimer(time, running, onTimeUpdated);

  const { editDialog, editTime } = _useEditDialog(time, onTimeUpdated);

  const _toggleTimer = useCallback(() => {
    !running && showGreetings();
    dispatch(timerModel.actions.toggleTimer());
  }, [dispatch, running, showGreetings]);

  useOnDocumentKeyUp({ key: " ", onKeyUp: _toggleTimer });

  if (loadingStatus === "loading") {
    return <Loader />;
  }

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
