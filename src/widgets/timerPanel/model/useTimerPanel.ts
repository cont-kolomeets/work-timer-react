import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/redux/hooks";
import { dialogModel } from "../../../entities/dialog";
import { useTimeEditorDialog } from "../../../features/timeEditorDialog/model/useTimeEditorDialog";
import { get1BasedDate, updateDocumentHeader } from "../../../shared/lib";
import { useOnDocumentKeyUp } from "../../../shared/model";
import DayTimer from "./DayTimer";
import { timerModel } from "./timerModel";
import { useShowGreetingsAlert } from "./useShowGreetingsAlert";

function _useEditDialog(time: number, onTimeUpdated: (time: number) => void) {
  const dispatch = useAppDispatch();

  const { editDialog, setEditDialogShown } = useTimeEditorDialog({
    time,
    onSetTime: async (time) => {
      dispatch(timerModel.actions.setTime(time));
      !time && dispatch(timerModel.actions.clearIntervals());
      await dispatch(timerModel.actions.postTime());
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
    // need to reset the day to a new one
    const { y, m, d } = get1BasedDate();
    dispatch(timerModel.actions.setDate({ year: y, month: m, day: d }));
    dispatch(timerModel.actions.setTime(dayTimer.current.time));
    dispatch(timerModel.actions.addInterval(dayTimer.current.interval.slice()));
  };
  dayTimer.current.onTickRare = async () => {
    await dispatch(timerModel.actions.postTime());
    onTimeUpdated(time);
  };

  useEffect(() => {
    if (running && !dayTimer.current.isRunning) {
      dayTimer.current.start(time);
      updateDocumentHeader(true);
    } else if (!running && dayTimer.current.isRunning) {
      dayTimer.current.stop();
      updateDocumentHeader(false);
    }
  }, [time, running, dayTimer]);
}

export function useTimerPanel(onTimeUpdated: (time: number) => void) {
  const dispatch = useAppDispatch();
  const time = useAppSelector(timerModel.selectors.getTime);
  const running = useAppSelector(timerModel.selectors.isRunning);
  const loadingStatus = useAppSelector(timerModel.selectors.getLoadingStatus);
  const { showGreetings } = useShowGreetingsAlert();
  const hasOpenDialogs = useAppSelector(dialogModel.selectors.getDialogState);

  // load time from the server the first time
  useEffect(() => {
    dispatch(timerModel.actions.fetchTime());
  }, [dispatch]);

  _useDayTimer(time, running, onTimeUpdated);

  const { editDialog, editTime } = _useEditDialog(time, onTimeUpdated);

  const toggleTimer = useCallback(() => {
    if (hasOpenDialogs) {
      return;
    }
    !running && showGreetings();
    dispatch(timerModel.actions.toggleTimer());
  }, [dispatch, running, showGreetings, hasOpenDialogs]);

  useOnDocumentKeyUp({ key: " ", onKeyUp: toggleTimer });

  return {
    time,
    running,
    loadingStatus,
    editDialog,
    editTime,
    toggleTimer,
  };
}
